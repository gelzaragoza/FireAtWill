const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql.js")

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/",(req,res)=>{
    mysql.getDashboard((dashboard)=>{
       res.render("admin/dashboard", {appCount:dashboard[0],appCur:dashboard[1],onProj:dashboard[2]}
       );      
    })
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

router.post("/client",(req,res)=>{
    console.log(req.body)
    mysql.addClient(req.body,()=>{
        res.redirect("/admin/client")
    })
})

router.get("/adminlogin",(req,res)=>{
    res.render("admin/adminlogin")
})

router.get("/adminregistration", (req,res)=>{
    res.render("admin/adminregistration")
})

router.post("/adminregistration", (req,res)=>{
    // console.log(req.body) 

    // mysql.adminRegistration(req.body,(retVal)=>{    
    //     if (retVal == 1) {
    //         res.redirect("/admin")
    //     } else {
    //         res.redirect("/admin")
    //     }
    // })

    // try {
    //     const { password } = req.body;
    //     const hash = await bcrypt.hash(password, 10);
    //     await mysql('users').insert({hash:hash});
    //     res.status(200).json('All good in the hood!');
    // } catch(e) {
    //     console.log(e);
    //     res.status(500).send('Seomthing broke!');
    // }

    mysql.adminRegistration(req.body,()=>{
        res.redirect("/admin/")
    })

    // let password = bcrypt.genSaltSync(saltRounds);
    // let hash = bcrypt.hashSync(req.body.password);
    // req.body.username, req.body.admin_pass

    // let salt = bcrypt.genSalt(saltRounds);
    // let hash = bcrypt.hash(req.body.password)
    // console.log("ASDFA")
    // console.log(req.body.password)
    // connection.query("INSERT INTO admin_accoutns (First_Name, Last_Name, username, admin_pass) VALUES('"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.username+"', '"+hash+"')", (err, res)=>{
    //     if (err) throw err;
    //     res.send("nice");
    // })
})  

router.get("/appointments",(req,res)=>{
    mysql.getAllAppointments((app)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        res.render("admin/appointments",{apps:app,months:months});
    })
});


router.get("/project_records",(req,res)=>{
    // res.render("admin/project_records");
    mysql.getProjects((project)=>{
        mysql.getClient((client)=>{
            mysql.getArtist((artist)=>{
                mysql.getDesign((design)=>{
                    res.render("admin/project_records", {projects:project, clients:client, artists:artist, designs:design})
                })  
            })          
        })   
    })
})

router.post("/project_records",(req,res)=>{
    console.log(req.body)
    mysql.addProject(req.body,()=>{
        res.redirect("/admin/project_records")
    })
})

router.get("/session_records",(req,res)=>{
    // res.render("admin/session_records");
    mysql.getSessions((session)=>{
        res.render("admin/session_records", {sessions:session})
    })
})

router.get("/transaction_records",(req,res)=>{
    // res.render("admin/transaction_records");
    mysql.getTransactions((transaction)=>{
        res.render("admin/transaction_records", {transactions:transaction[0], tran_seshes:transaction[1]})
    })
})

module.exports= router;