const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "newtattoo_db",
    multipleStatements: true
});
connection.connect((err)=>{
    if(err) throw (err);
    console.log("Database Connected");
})
module.exports = {
    previewImage: function(id,callback){
        connection.query("SELECT * FROM design_archive WHERE Design_ID="+id,(err,img)=>{
            if(err) throw(err);
            callback(img);
        })
    },
    getGallery: function(callback){
        connection.query("SELECT * FROM design_archive WHERE Design_ID>0",(err,imgs)=>{
            if(err) throw(err);
            callback(imgs);
        });
    },
    searchGallery: function(keyword,callback){
        connection.query("SELECT * FROM design_archive WHERE Image_Tags REGEXP '^.*"+keyword+".*$' AND Design_ID>0",(err,imgs)=>{
            if(err) throw(err);
            callback(imgs);
        });
    },
    addApointments: function(body,id,callback){
        if(body.imglink==""&& parseInt(body.imgarc)==0 || body.imgarc==undefined){
            connection.query("INSERT INTO appointment(Client_id,Date_Created,Appointment_Date,Image_Submission,Image_Archive_ID,purpose,Status) VALUES("+id+",CURDATE(),'"+body.date+"','N/A',0,'"+body.purpose+"','Pending')",(err,res)=>{
                if(err) throw(err);
                callback();
            })
        }else if(body.imgarc==undefined){
            connection.query("INSERT INTO appointment(Client_id,Date_Created,Appointment_Date,Image_Submission,Image_Archive_ID,purpose,Status) VALUES("+id+",CURDATE(),'"+body.date+"','"+body.imglink+"',0,'"+body.purpose+"','Pending')",(err,res)=>{
                if(err) throw(err);
                callback();
            })
        }else{
            connection.query("INSERT INTO appointment(Client_id,Date_Created,Appointment_Date,Image_Submission,Image_Archive_ID,purpose,Status) VALUES("+id+",CURDATE(),'"+body.date+"','N/A','"+body.imgarc+"','"+body.purpose+"','Pending')",(err,res)=>{
                if(err) throw(err);
                callback();
            })
        }
    },
    getAppointments: function(id,callback){
        connection.query("SELECT * FROM appointment WHERE Client_ID="+id,(err,app)=>{
            if(err) throw(err);
            callback(app);
        });
    },
    getAllAppointments: function(callback){
        connection.query("SELECT * FROM appointment",(err,app)=>{
            if(err) throw(err);
            callback(app);
        });
    },
    addSession: function(body,callback){
        connection.query("INSERT INTO tattoo_session(Project_Number, Time_Started, Time_Finished, Session_Date, Total_Hours) VALUES("+body.projectNumber+", "+body.timeStart+", "+body.timeEnd+", "+body.date+", TO_CHAR(TIME '"+body.timeStart+" - "+body.timeEnd+"', 'HH.MM'))", (err,newsession)=>{
            if(err) throw(err);
            callback(newsession);
        })
    },
    loginClient: function(contact,callback){
        connection.query("SELECT * FROM client WHERE Contact_Number='"+contact+"'",(err,client)=>{
            if(client.length==1){
                callback(client);
            }else{
                callback(null);
            }
        });
    },
    addClient: function(body,callback){
        connection.query("INSERT INTO client(First_Name, Last_Name, Contact_Number, City, Street, Address, Remarks) VALUES('"+body.firstname+"', '"+body.lastname+"', '"+body.contactnumber+"', '"+body.city+"', '"+body.street+"', '"+body.address+"', '"+body.remarks+"')", (err,res)=>{
            if(err) throw(err);
            callback();
        })
    },
    addArtist: function(body,callback){
        connection.query("INSERT INTO artist(First_Name, Last_Name, Contact_Number, City, Street, Address, Rate) VALUES('"+body.firstname+"', '"+body.lastname+"', '"+body.contactnumber+"', '"+body.city+"', '"+body.street+"', '"+body.address+"', '"+body.rates+"')", (err,res)=>{
            if(err) throw(err);
            callback();
        })
    },
    addProject: function(body,callback){
        connection.query("INSERT INTO project_records(Client_ID, Design_ID, Artist_ID, Status, Color, Size, Date_Started, Date_Finished) VALUES('"+body.clientname+"', '"+body.design+"', '"+body.artistname+"', 'Ongoing', '"+body.color+"', '"+body.size+"', '"+body.date+"', NULL)", (err,res)=>{
            if(err) throw(err);
            callback();
        })
    },
    getArtist: function(callback){
        connection.query("SELECT * FROM artist",(err,artist)=>{
            if(err) throw(err);
            callback(artist);
        })
    }, 
    getClient: function(callback){
        connection.query("SELECT * FROM client",(err,client)=>{
            if(err) throw(err);
            callback(client);
        })
    },
    getDesign: function(callback){
        connection.query("SELECT * FROM design_archive",(err,design)=>{
            if(err) throw(err);
            callback(design);
        })
    },
    getSessions: function(callback){
        connection.query("SELECT tattoo_session.Session_Number AS session_num, tattoo_session.Session_Date AS session_date, tattoo_session.Time_Started AS session_start, tattoo_session.Time_Finised AS session_end, (client.First_Name + client.Last_Name) AS client_name, project_records.Project_Number, (artist.First_Name + artist.Last_Name) AS artist_name FROM tattoo_session INNER JOIN project_records ON tattoo_session.Project_Number=project_records.Project_Number INNER JOIN client ON project_records.Client_ID=client.Client_ID INNER JOIN artist ON project_records.Artist_ID=artist.Artist_ID",(err,session)=>{
            if(err) throw(err);
            callback(session);
        })
    },
    getTransactions: function(callback){
        connection.query("SELECT payment.Receipt_ID AS receipt_id, payment.Payment_ID AS payment_id, design_archive.Design_ID as design_id, project_records.Project_Number AS project_number, (client.First_Name + client.Last_Name) AS client_name, tattoo_session.Session_Number AS session_number, SUM(payment.Amount) AS total_payment FROM payment INNER JOIN client ON payment.Client_ID=client.Client_ID INNER JOIN tattoo_session ON payment.Session_Number=tattoo_session.Session_Number INNER JOIN project_records ON tattoo_session.Project_Number=project_records.Project_Number INNER JOIN design_archive ON project_records.Design_ID=design_archive.Design_ID GROUP BY project_records.Project_Number; SELECT payment.Receipt_ID AS receipt_id, project_records.Project_Number AS project_number, tattoo_session.Session_Number AS session_number, tattoo_session.Time_Started AS session_start, tattoo_session.Time_Finised AS session_end, tattoo_session.Session_Date AS session_date, payment.Amount AS session_payment FROM payment INNER JOIN tattoo_session ON payment.Session_Number=tattoo_session.Session_Number INNER JOIN project_records ON tattoo_session.Project_Number=project_records.Project_Number GROUP BY project_records.Project_Number",(err,transaction)=>{
            if(err) throw(err);
            callback(transaction);
        })
    },
    getProjects: function(callback){
        connection.query("SELECT project_records.Project_Number, artist.First_Name AS artist_FN, artist.Last_Name AS artist_LN, client.First_Name AS client_FN, client.Last_Name AS client_LN, project_records.Color, project_records.Date_Started, project_records.Date_Finished, design_archive.Design_Name, project_records.Size, project_records.Status FROM project_records INNER JOIN artist ON project_records.Artist_ID=artist.Artist_ID INNER JOIN client ON project_records.Client_ID=client.Client_ID INNER JOIN design_archive ON project_records.Design_ID=design_archive.Design_ID GROUP BY project_records.Project_Number", (err,project)=>{
            if(err) throw(err);
            callback(project);
        })
    },
    getDashboard: function(callback){
        connection.query("SELECT * FROM appointment WHERE Status='Pending' OR Status='Approved'; SELECT * FROM appointment WHERE Appointment_Date=CURDATE(); SELECT * FROM project_records WHERE Status='Ongoing'; SELECT * FROM client",(err, dashboard)=>{
            if(err) throw(err);
            callback(dashboard);
        })
    }
}

/*
    functioname: function(param1,param2...){
        connection.query("SQL QUERY HERE", (err,variable_name)=>{
            //Do something
            callback(param1,param2...); callback always inside a function.
        })
    }
*/