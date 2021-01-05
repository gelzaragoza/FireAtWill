const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.render("client/clientui");
});

router.get("/appointments",(req,res)=>{
    res.render("client/appointment");
});

module.exports= router;