const mysql = require("mysql");
require('dotenv').config();


const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
  });


mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Connected to database');
    } else {
        console.log('failed to connect to database : \n' + err);
    }
});

module.exports = mysqlConnection;
