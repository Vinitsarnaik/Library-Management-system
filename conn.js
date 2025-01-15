const mysql = require("mysql2")
const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database:"library",
    port:3307
   
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports = con;