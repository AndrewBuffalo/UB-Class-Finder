const express = require("express");
const router = new express.Router();
const verifyToken = require("./verifyToken.js");
const jwt = require("jsonwebtoken");
const sql = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

require("dotenv/config");

router.get("/login", verifyToken, (req,res)=>{
    if(!req.anonymous){
        res.redirect(req.query.goto||"/");
    } else {
        res.render("login");
    }
});

router.get("/register", verifyToken, (req,res)=>{
    if(!req.anonymous){
        res.redirect(req.query.goto||"/");
    } else {
        res.render("register");
    }
});

router.post("/login", (req, res) => {
    const db = new sql.Database('./users.sqlite');
    let { username, password } = req.body;
    db.serialize(() => {
        db.all(`SELECT * FROM users WHERE username = "${username}"`, (err, [user]) => {
            if(err)
                throw err;
            if(!user)
                return res.status(400).send("user not found");
            if(!bcrypt.compareSync(password, user.password))
                return res.status(400).send("incorrect password");
            jwt.sign({ username }, process.env.SECRET, (err, token)=>{
                if(err)
                    throw err;
                res.cookie("token", token).redirect(req.query.goto ?? "/");
            });
        });
    });
});

router.post("/register", (req, res) => {
    const db = new sql.Database('./users.sqlite');
    let { username, email, password } = req.body;
    db.serialize(() => {
        db.all(`SELECT * FROM users WHERE username = "${username}"`, (err, users) => {
            if(err)
                throw err;
            if(users && users.length)
                return res.status(400).send("username already taken");
            db.run(`INSERT INTO users (username, email, password) VALUES ("${username}", "${email}", "${bcrypt.hashSync(password, 10)}")`, err=>{
                if(err)
                    throw err;
                jwt.sign({ username }, process.env.SECRET, (err, token)=>{
                    if(err)
                    res.status(500).send(err);
                    res.cookie("token", token).redirect(req.query.goto ?? "/");
                });
                db.close(); 
            });
        });
    });
});

module.exports = router;