const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js");

router.get("/",(req,res)=>{
    if(req.session.type){
        mysql.getGallery((imgs)=>{
            res.render("landing/gallery",{type:req.session.type,images:imgs});
        });
    }else{
        mysql.getGallery((imgs)=>{
            res.render("landing/gallery",{type:"guest",images:imgs});
        });
    }
});

router.post("/",(req,res)=>{
    mysql.searchGallery(req.query.keyword,(imgs)=>{
        res.render("landing/gallerysnippet",{images:imgs});
    });
});

router.post("/adddesign",(req,res)=>{
    mysql.addDesign(req.body,()=>{
        res.redirect("/gallery");
    })
});

module.exports= router;