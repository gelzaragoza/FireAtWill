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
        mysql.getGallery((imgs)=>{
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            res.render("client/appointment",{apps:app,months:months,images:imgs});
        });
    })
});

router.post("/preview",(req,res)=>{
    if(parseInt(req.query.id)==0){
        res.end();
    }else{
        mysql.previewImage(parseInt(req.query.id),(img)=>{
            res.render("client/imgprev",{link:img[0].Image_Link});
        })
    }
});

router.post("/appointments", (req,res)=>{
    mysql.addApointments(req.body,req.session.userid,()=>{
        res.redirect("/client/appointments");
    })
});

module.exports= router;