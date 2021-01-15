const mysql = require("mysql");
const { connect } = require("../router/admin");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "tattoo_db",
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