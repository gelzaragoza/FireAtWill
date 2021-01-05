const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.render("admin/artist_records");
})

module.exports= router;