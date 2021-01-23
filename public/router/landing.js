const express = require("express");
const router = express.Router();
const mid = require("../controller/middleware.js");

router.get("/",mid.home,(req,res)=>{
    req.session.type="guest";
    res.render("landing/landing");
})

router.get("/adminlogin",mid.home,(req,res)=>{
    res.render("admin/adminlogin")
})

module.exports= router;