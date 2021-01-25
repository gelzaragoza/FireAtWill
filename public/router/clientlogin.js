const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js");
const mid = require("../controller/middleware.js");

router.get("/",mid.home,(req,res)=>{
    res.render("client/clientlogin");
})

router.post("/",mid.home,(req,res)=>{
    mysql.loginClient(req.body.number,(client)=>{
        if(client!=null){
            req.session.userid=client[0].Client_ID;
            req.session.type="client";
            req.session.user= client[0].First_Name+" "+client[0].Last_Name;
            res.redirect("/client")
        }else{
            res.redirect("/clientlogin")
        }
    });
})

module.exports= router;