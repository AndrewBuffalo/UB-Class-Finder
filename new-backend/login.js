const express = require("express");
const router = new express.Router();
const verifyToken = require("./verifyToken.js");

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

module.exports = router;