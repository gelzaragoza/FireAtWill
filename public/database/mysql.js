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
    addApointments: function(body,id,callback){
        if(body.imglink==""&&body.imgarc==undefined){
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
            connection.query("INSERT INTO appointment(Client_id,Date_Created,Appointment_Date,Image_Submission,Image_Archive_ID,purpose,Status) VALUES("+id+",CURDATE(),'"+body.date+"','N/A',1,'"+body.purpose+"','Pending')",(err,res)=>{
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
    addSession: function(){

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
    getSessions: function(callback){
        connection.query("SELECT tattoo_session.Session_Number AS session_num, tattoo_session.Session_Date AS session_date, tattoo_session.Time_Started AS session_start, tattoo_session.Time_Finised AS session_end, (client.First_Name + client.Last_Name) AS client_name, project_records.Project_Number, (artist.First_Name + artist.Last_Name) AS artist_name FROM tattoo_session INNER JOIN project_records ON tattoo_session.Project_Number=project_records.Project_Number INNER JOIN client ON project_records.Client_ID=client.Client_ID INNER JOIN artist ON project_records.Artist_ID=artist.Artist_ID",(err,session)=>{
            if(err) throw(err);
            callback(session);
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