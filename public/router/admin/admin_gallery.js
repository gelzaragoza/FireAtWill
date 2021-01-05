const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.render("admin/admin_gallery");
})

module.exports= router;

/* dili cguro ni needed...idisable lng cguro ang uban features sa gallery depende sa usertype */