const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js")

router.get("/",(req,res)=>{
    res.render("admin/dashboard");
})

router.get("/artist",(req,res)=>{
    mysql.getArtist((artist)=>{
        console.log(artist)
        res.render("admin/artist_records", {artists:artist});
    })
})

router.post("/artist",(req,res)=>{
    console.log(req.body)
    mysql.addArtist(req.body,()=>{
        res.redirect("/admin/artist")
    })
})

router.get("/client",(req,res)=>{
    mysql.getClient((client)=>{
        console.log(client)
        res.render("admin/client_records", {clients:client});
    })
})

router.get("/adminlogin",(req,res)=>{
    res.render("admin/adminlogin")
})

router.get("/adminregistration",(req,res)=>{
    res.render("admin/adminregistration")
})

router.get("/appointments",(req,res)=>{
    mysql.getAllAppointments((app)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        res.render("admin/appointments",{apps:app,months:months});
    })
});

router.post("/client",(req,res)=>{
    console.log(req.body)
    mysql.addClient(req.body,()=>{
        res.redirect("/admin/client")
    })
})

router.get("/project_records",(req,res)=>{
    res.render("admin/project_records");
})

router.get("/session_records",(req,res)=>{
    // res.render("admin/session_records");
    mysql.getSessions((session)=>{
        res.render("admin/session_records", {sessions:session})
    })
})

router.get("/transaction_records",(req,res)=>{
    // res.render("admin/transaction_records");
    mysql.getTransactions((transaction,tran_sesh)=>{
        res.render("admin/transaction_records", {transactions:transaction[0], tran_seshes:transaction[1]})
    })
})

module.exports= router;