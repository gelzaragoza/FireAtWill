const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    // res.render("landing/gallery");
    res.render("/admin_gallery");
})

module.exports= router;