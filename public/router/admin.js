const express = require("express");
const router = express.Router();

// const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res)=>{
    res.render("admin/dashboard");
})

router.get("/artist",(req,res)=>{
    res.render("admin/artist_records");
})

router.get("/client",(req,res)=>{
    res.render("admin/client_records");
})

router.get("/project_records",(req,res)=>{
    res.render("admin/project_records");
})

router.get("/session_records",(req,res)=>{
    res.render("admin/session_records");
})

router.get("/transaction_records",(req,res)=>{
    res.render("admin/transaction_records");
})

module.exports= router;