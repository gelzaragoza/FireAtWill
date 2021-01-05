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

const gallery = require("./public/router/gallery.js");
app.use("/gallery",gallery);

// const admin_gallery = require("./public/router/admin_gallery.js");
// app.use("/gallery",admin_gallery);
/* di ra cguro ni needed...naa lay features mahidden/disable depende sa user-type*/

const login = require("./public/router/clientlogin.js");
app.use("/clientlogin",login);

const artist = require("./public/router/artist_records.js");
app.use("/artist",artist);

const client = require("./public/router/client_records.js");
app.use("/client",client);

const project = require("./public/router/project_records.js");
app.use("/project",project);

app.listen(4000,"0.0.0.0",()=>{
    console.log("Connected to port 4000");
});
