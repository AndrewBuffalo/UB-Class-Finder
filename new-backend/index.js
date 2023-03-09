Array.prototype.includesObject = function(obj){
    for(let i = 0; i < this.length; i++){
        if(typeof this[i] !== "object")
            continue;
        if(areSame(this[i],obj))
            return true;
    }
    return false;
}
Array.prototype.indexOfObject = function(obj){
    for(let i = 0; i < this.length; i++)
        if(typeof this[i] === "object" && areSame(this[i], obj))
            return i;
    return -1;
}

const sql = require("sqlite3");

const fs = require("fs");
const courses = [];

const {withinTimeRange, timeToNumber} = require("./time.js");
const areSame = require("./areSame.js");

const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/static", express.static(`${__dirname}/public`))

app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", (req,res)=>{
    res.render("form");
});

function getIdentifierFromCourseID(id){
    if(!isNaN(id))
        return {Class: id};
    let [a,b] = id.split("||");
    return {Course: a, Section: b};
}

// Add user db for favoriting
function sendError(req, res, error_code){
    res.render("error", {error_code});
}

app.get("/favorites", (req,res)=>{
    sendError(req, res, 401);
});
app.put("/add", (req,res)=>{
    sendError(req, res, 401);
});
app.delete("/remove", (req,res)=>{
    sendError(req, res, 401);
});

app.get("/check", (req,res)=>{
    const db = new sql.Database('./ub_classes.sqlite');
    db.serialize(() => {
        db.all(`SELECT * FROM classes`, (err, courses) => {
            if(err)
                throw err;
            let days = new Array(5).fill(0).map((_,i)=>req.query[`day${i+1}`].toUpperCase()),
                room = req.query.room.toUpperCase(),
                time = req.query.time != "" ? req.query.time.toUpperCase() : null,
                lectures_only = req.query.lectures_only;
            res.render("results", {
                matches: courses.filter(course=>{
                    if(lectures_only && !course.Type.includes("LEC"))
                        return false;
                    let isDay = days.every(day=>course.Days.includes(day)),
                        isRoom = course.Room.includes(room),
                        isTime = time ? (!/[^APM\-0-9:\s]+/g.test(course.Time) ? withinTimeRange(time, course.Time) : false) : true;
                    return isDay && isRoom && isTime;
                }).sort((a,b)=>!/[^APM\-0-9:\s]+/g.test(a.Time) ? (!/[^APM\-0-9:\s]+/g.test(b.Time) ? (timeToNumber(a.Time.split(" - ")[0]) - timeToNumber(b.Time.split(" - ")[0])) : -1) : !/[^APM\-0-9:\s]+/g.test(b.Time) ? 1 : 0)
            });
        });
    });
    db.close();
});

app.get("/getClass", (req,res)=>{
    const db = new sql.Database('./ub_classes.sqlite');
    db.serialize(() => {
        db.all(`SELECT * FROM classes`, (err, courses) => {
            if(err)
                throw err;
            let name = req.query.name.toLowerCase(),
                code = req.query.code.toUpperCase(),
                lectures_only = req.query.lectures_only;
            res.render("results", {
                matches: courses.filter(course=>{
                    if(lectures_only && course.Type != "LEC")
                        return false;
                    return course.Course.includes(code) && (course.Title.toLowerCase().includes(name) || name.includes(course.Title.toLowerCase()));
                }).sort((a,b)=>!/[^APM\-0-9:\s]+/g.test(a.Time) ? (!/[^APM\-0-9:\s]+/g.test(b.Time) ? (timeToNumber(a.Time.split(" - ")[0]) - timeToNumber(b.Time.split(" - ")[0])) : -1) : !/[^APM\-0-9:\s]+/g.test(b.Time) ? 1 : 0)
            });
        });
    });
    db.close();
});

app.use("/api", require("./api.js"));

app.all("*", (req,res)=>{
    sendError(req, res, 404);
})

app.listen(80);


// TODO: Make backend work with new database format