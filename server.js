const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"DBMSP"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    else
    console.log("Connected!");
  });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
  })