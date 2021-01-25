const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js")
const mid = require("../controller/middleware.js");

router.get("/",mid.client,(req,res)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    mysql.getAppointments(req.session.userid,(app)=>{
        res.render("client/clientui",{apps:app,check:0,months:months});
    });
});

router.get("/appointments",mid.client,(req,res)=>{
    mysql.getAppointments(req.session.userid,(app)=>{
        mysql.getGallery((imgs)=>{
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            res.render("client/appointment",{apps:app,months:months,images:imgs});
        });
    })
});

router.post("/preview",mid.client,(req,res)=>{
    if(parseInt(req.query.id)==0){
        res.end();
    }else{
        mysql.previewImage(parseInt(req.query.id),(img)=>{
            res.render("client/imgprev",{link:img[0].Image_Link});
        })
    }
});

router.post("/appointments",mid.client,(req,res)=>{
    console.log(req.body)
    mysql.addApointments(req.body,req.session.userid,()=>{
        res.redirect("/client/appointments");
    })
});

module.exports= router;