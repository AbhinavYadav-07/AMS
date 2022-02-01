const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//connecting database

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"apartment"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    else
    console.log("Connected!");
  });

// Rendering the pages

app.get('', function (req, res) {
  res.render(__dirname+"/views/login.ejs");
     })
app.get('/Admin',function(req,res){
  res.render("Admin");
     })
app.get('/guardLogin',function(req,res){
      res.render("guardLogin");
  })
app.get('/myprofile',function(req,res){
  res.render("myprofile");
})
app.get('/event',function(req,res){
  res.render("event");
})
 app.get('/GuardAccount',function(req,res){
  res.render("GuardAccount");
})
 app.get('/GuardProfile',function(req,res){
  res.render("GuardProfile");
})
 app.get('/Gurad',function(req,res){
  res.render("Gurad");
})
 app.get('/profile',function(req,res){
  res.render("profile");
})
 app.get('/TenantUpdate',function(req,res){
  res.render("TenantUpdate");
})
 app.get('/visitor',function(req,res){
  res.render("visitor");
})
 app.get('/Account',function(req,res){
  res.render("Account");
})
 app.get('/adminLogin',function(req,res){
  res.render("adminLogin");
})

//listerner

app.listen(3000, () => {
    console.log("Server is running on port 3000");
  })