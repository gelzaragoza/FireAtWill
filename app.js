const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

//Routes
/*  Routes Format
    const name = require("file directory");
    app.use("/",name);
    app.use() first parameter will act as the url path
*/

const landing = require("./public/router/landing.js");
app.use("/",landing);

app.listen(4000,"0.0.0.0",()=>{
    console.log("Connected to port 4000");
});
