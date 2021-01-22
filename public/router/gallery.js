const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js");

router.get("/",(req,res)=>{
    if(req.session.type){
        res.render("landing/gallery",{type:req.session.type});
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

module.exports= router;