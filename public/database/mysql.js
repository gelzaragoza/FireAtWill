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
    addApointments: function(body,callback){
        connection.query("SELECT * FROM appointment; SELECT * FROM client",(err,table)=>{
            console.log(table[0]);
            callback();
        })
    },
    addSession: function(){

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
