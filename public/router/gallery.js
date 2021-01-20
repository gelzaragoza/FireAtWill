const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    if(req.session.type){
        res.render("landing/gallery",{type:req.session.type});
    }else{
        res.render("landing/gallery",{type:"guest"});
    }
})

module.exports= router;