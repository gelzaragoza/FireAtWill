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

    
}