const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js")

router.get("/",(req,res)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    mysql.getAppointments(req.session.userid,(app)=>{
        res.render("client/clientui",{apps:app,check:0,months:months});
    });
});

router.get("/appointments",(req,res)=>{
    mysql.getAppointments(req.session.userid,(app)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        res.render("client/appointment",{apps:app,months:months});
    })
});

router.post("/appointments", (req,res)=>{
    mysql.addApointments(req.body,req.session.userid,()=>{
        res.redirect("/client/appointments");
    })
});

module.exports= router;