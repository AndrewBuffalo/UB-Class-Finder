require("dotenv/config");
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

const Database = require("better-sqlite3");

const {withinTimeRange, timeToNumber} = require("./time.js");
const areSame = require("./areSame.js");

const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require("cookie-parser")());
const verifyToken = require("./verifyToken.js");

app.use("/static", express.static(`${__dirname}/public`))

app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", verifyToken, (req,res)=>{
    res.render("form", {
        jwt: req.JWTBody,
        anon: req.anonymous,
        username: req.JWTBody?.username
    });
});

// Add user db for favoriting
function sendError(req, res, error_code){
    res.status(error_code).render("error", {error_code});
}

app.get("/favorites", verifyToken, (req,res)=>{
    if(req.anonymous)
        res.redirect("/login?goto=/favorites");
    const userDB = new Database('./users.sqlite');
    const favoriteIds = userDB.prepare("SELECT favorites FROM users WHERE username=?").get(req.JWTBody.username).favorites.split(",");
    userDB.close();
    const classDB = new Database("./ub_classes.sqlite");
    const favorites = 
    res.render("results", {
        matches: classDB.prepare(`SELECT * FROM classes WHERE id IN (${favoriteIds.map(id=>`'${id}'`).join(", ")})`).all(),
        anon: req.anonymous,
        url: encodeURIComponent(req.originalUrl)
    })
    res.json(favorites);
});

app.put("/favorites", verifyToken, (req,res)=>{
    if(req.anonymous)
        return res.sendStatus(401);
    const db = new Database('./users.sqlite');
    let class_id = req.query.class_id;
    let favorites = db.prepare("SELECT favorites FROM users WHERE username=?").get(req.JWTBody.username).favorites;
    if(favorites === "" || favorites == undefined){
        favorites = class_id;
    } else {
        if(!favorites.split(",").some(fav=>fav===class_id))
        favorites += "," + class_id;
    }
    db.prepare("UPDATE users SET favorites=? WHERE username=?").run(favorites, req.JWTBody.username);
    res.json({success: true});
});
app.delete("/favorites", verifyToken, (req,res)=>{
    if(req.anonymous)
        return res.sendStatus(401);
    const db = new Database('./users.sqlite');
    let class_id = req.query.class_id;
    let favorites = db.prepare("SELECT favorites FROM users WHERE username=?").get(req.JWTBody.username).favorites;
    if(favorites === "" || favorites == undefined)
        return res.status(400).json({success: false, error: "No favorites to remove"});
    let queryString = "," + class_id;
    let index = favorites.indexOf(queryString);
    db.prepare("UPDATE users SET favorites=? WHERE username=?").run(favorites.slice(0, index) + favorites.slice(index + queryString.length), req.JWTBody.username);
    res.json({success: true});
});

app.get("/check", verifyToken, (req,res)=>{
    let days = new Array(5).fill(0).map((_,i)=>req.query[`day${i+1}`].toUpperCase()).filter(x=>x!==""),
        room = req.query.room?.toUpperCase() ?? "",
        lectures_only = !!req.query.lectures_only,
        time = req.query.time != "" ? req.query.time.toUpperCase() : null;
    let day_filter = days.map(day=>`Days LIKE '%${day}%'`).join(" OR ");
    const db = new Database('./ub_classes.sqlite');
    const matches = db.prepare(`SELECT * FROM classes WHERE ${day_filter ? day_filter + " AND " : ""} Room LIKE '%${room}%' ${lectures_only ? "AND Type == 'LEC'" : ""}`).all()
        .filter(course=>time ? (!/[^APM\-0-9:\s]+/g.test(course.Time) ? withinTimeRange(time, course.Time) : false) : true)
        .sort((a,b)=>!/[^APM\-0-9:\s]+/g.test(a.Time) ? (!/[^APM\-0-9:\s]+/g.test(b.Time) ? (timeToNumber(a.Time.split(" - ")[0]) - timeToNumber(b.Time.split(" - ")[0])) : -1) : !/[^APM\-0-9:\s]+/g.test(b.Time) ? 1 : 0);
    db.close();
    res.render("results", {
        matches,
        url: encodeURIComponent(req.originalUrl),
        anon: req.anonymous
    });
});

app.get("/getClass", verifyToken, (req,res)=>{
    const db = new Database('./ub_classes.sqlite');
    const matches = db.prepare(`SELECT * FROM classes WHERE Title LIKE '%${req.query.name.toLowerCase()}%' AND Course LIKE '%${req.query.code.toUpperCase()}%' ${req.query.lectures_only ? "AND Type == 'LEC'" : ""}`).all()
        .sort((a,b)=>!/[^APM\-0-9:\s]+/g.test(a.Time) ? (!/[^APM\-0-9:\s]+/g.test(b.Time) ? (timeToNumber(a.Time.split(" - ")[0]) - timeToNumber(b.Time.split(" - ")[0])) : -1) : !/[^APM\-0-9:\s]+/g.test(b.Time) ? 1 : 0);
    res.render("results", {
        matches,
        url: encodeURIComponent(req.originalUrl),
        anon: req.anonymous
    });
    db.close();
});

app.use("/api", require("./api.js"));
app.use("/", require("./login.js"));

app.all("*", (req,res)=>{
    sendError(req, res, 404);
})

app.listen(80);

// TODO: Change Time from TEXT to start TIME and end TIME
// TODO: Make sure optional query parameters are not undefined