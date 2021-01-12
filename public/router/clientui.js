const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js")

router.get("/",(req,res)=>{
    res.render("client/clientui");
});

router.get("/appointments",(req,res)=>{
    res.render("client/appointment");
});

router.post("/appointments", (req,res)=>{
    console.log(req.body);
    mysql.addApointments(req.body,(ret)=>{
        res.redirect("/client/appointments");
    })
});

module.exports= router;