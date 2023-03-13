const { withinTimeRange, timeToNumber } = require("./time.js")

const sql = require("sqlite3").verbose()
function getOpenRoomsByCampus(campus="North"){
    return new Promise((resolve, reject) => {
        const db = new sql.Database('./ub_classes.sqlite');
        db.serialize(() => {
            db.all(`SELECT * FROM classes WHERE location = '${campus} Campus'`, (err, courses) => {
                if(err)
                    throw err;
                resolve(courses = courses.filter(course=>{
                        let d = new Date();
                        let timeString = d.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"});
                        let isTime = !/[^APM\-0-9:\s]+/g.test(course.Time) ? withinTimeRange(timeString, course.Time) : false;
                        let isDay = course.Days.split(" ").includes(["", "M", "T", "W", "R", "F", "S"][d.getDay()]);
                        return !(isTime && isDay);
                    }).map(course=>{
                        return  {'Until': course.Time.split(" - ")[0], "Room": course.Room}
                    })
                    .sort((a,b)=>!/[^APM\-0-9:\s]+/g.test(a.Time) ? (!/[^APM\-0-9:\s]+/g.test(b.Time) ? (timeToNumber(a.Time.split(" - ")[0]) - timeToNumber(b.Time.split(" - ")[0])) : -1) : !/[^APM\-0-9:\s]+/g.test(b.Time) ? 1 : 0)
                );
            });
        });
        db.close();
    });
}

const express = require("express");
const verifyToken = require("./verifyToken.js");
const api = new express.Router();

api.use(express.urlencoded({extended:true}));
api.use(express.json());

api.get("/favorites", verifyToken, (req, res) => {
    if(req.anonymous) // bad practice
        return res.status(401).json({error: "You must be logged in to use this feature."});
    const db = new sql.Database('./users.sqlite');
    db.serialize(() => {
        db.get(`SELECT favorites FROM users WHERE username='${req.JWTBody.username}'`, (err, {favorites}) => {
            if(err)
                throw err;
            res.json(favorites.split(","));
        });
    });
    db.close();
});

api.get("/:campus", (req,res)=>{
    let campus = req.params.campus;
    getOpenRoomsByCampus(campus).then(courses=>{
        res.json(courses);
    });
});

module.exports = api;