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

  //Authentication
var AUTH;
var loginStatus=false;

app.get('/', (req, res) => {
  if(!loginStatus){
    res.render("login")
  }
  else{
    res.redirect("myprofile")
  }
})

app.post('/', (req,res)=>{
  var username=req.body.username
  var password=req.body.password
  con.query(`SELECT PASSWORD FROM tenant WHERE ID="${username}"`,function(error,results){
    if(error || results[0]==undefined){
      console.log(error);
      res.redirect("/")
    }
    else{
      console.log(results[0].PASSWORD);
      if(results[0].PASSWORD==password){
        loginStatus=true
        AUTH = username;
        res.redirect("myprofile")
      }
      else
      res.redirect("/");
      
    }
  })
})
app.get("/logout", (req,res)=>{
  loginS=false;
  loginStatus=false;
  loginStat=false;
  AUTH =null;
  res.redirect("/");
})

var loginS=false;

app.get('/adminLogin', (req, res) => {
  if(!loginS){
    res.render("adminLogin")
  }
  else{
    res.redirect("Admin")
  }
})

app.post('/adminLogin', (req,res)=>{
  var username=req.body.username
  var password=req.body.password
  con.query(`SELECT PASSWORD FROM admin WHERE ID="${username}"`,function(error,results){
    if(error || results[0]==undefined){
      console.log(error);
      res.redirect("/adminLogin")
    }
    else{
      console.log(results[0].PASSWORD);
      if(results[0].PASSWORD==password){
        loginS=true
        AUTH= username;
        res.redirect("Admin")
      }
      else
      res.redirect("/adminLogin");
      
    }
  })
})
app.get("/ADlogout", (req,res)=>{
  loginS=false;
  loginStatus=false;
  loginStat=false;
  AUTH = null;
  res.redirect("/adminLogin");
})

var loginStat=false;

app.get('/guardLogin', (req, res) => {
  if(!loginStat){
    res.render("guardLogin")
  }
  else{
    res.redirect("Gurad")
  }
})

app.post('/guardLogin', (req,res)=>{
  var username=req.body.username
  var password=req.body.password
  con.query(`SELECT PASSWORD FROM guard WHERE GUARD_ID="${username}"`,function(error,results){
    if(error || results[0]==undefined){
      console.log(error);
      res.redirect("/guardLogin")
    }
    else{
      console.log(results[0].PASSWORD);
      if(results[0].PASSWORD==password){
        loginStat=true
        AUTH = username
        res.redirect("Gurad")
      }
      else
      res.redirect("/guardLogin");
      
    }
  })
})
app.get("/gd", (req,res)=>{
  loginS=false;
  loginStatus=false;
  loginStat=false;
  AUTH = null;
  res.redirect("/guardLogin");
})

// Post method input for event
app.post('/event', function(req,res,next){
  var name = req.body.name;
  var date = req.body.date;
  var time = req.body.time;
  var fnum = req.body.fnum;
  var block = req.body.block;
  var number = req.body.number;
  var venue= req.body.venue;
  var rnum=req.body.rnum;
  var rblock=req.body.rblock;
  console.log(name,date,time,fnum,block,venue,rnum)
  var sql = `INSERT INTO event values ("${name}", "${date}", "${time}", "${block}", "${fnum}", "${rnum}", "${venue}")`;
 con.query(sql, function(err, result) {
   if (err) throw err;
   console.log('record inserted');
   //req.flash('success', 'Data added successfully!');
   res.redirect('/myprofile');
 });
})

// Post method input for visitor
app.post('/Gurad', function(req,res,next){
  var name = req.body.name;
  var number = req.body.number;
  var email= req.body.email;
  var rnum = req.body.rnum;
  var block = req.body.block;
  var date = req.body.date;
  var purpose= req.body.purpose;
  var entime = req.body.entime;
  var extime = req.body.extime;

  var sql = `INSERT INTO visitor values ("${name}", "${number}", "${email}", "${rnum}", "${block}", "${date}", "${purpose}", "${entime}", "${extime}" )`;
 con.query(sql, function(err, result) {
   if (err) throw err;
   console.log('record inserted');
   //req.flash('success', 'Data added successfully!');
   res.redirect('/Gurad');
 });
})

//COMPLAINT REGESTER

app.post('/myprofile', function(req,res,next){
  var name = req.body.name;
  var number = req.body.number;
  var email= req.body.email;
  var block = req.body.block;
  var date = req.body.date;
  var message= req.body.message;
  console.log(name,message,date,block,email,number)
  var sql = `INSERT INTO complaint values ("${name}", "${number}", "${email}", "${message}", "${date}", "${block}")`;
 con.query(sql, function(err, result) {
   if (err) throw err;
   console.log('record inserted');
   //req.flash('success', 'Data added successfully!');
   res.redirect('/myprofile');
 });
})

// guard input 

app.post('/GuardAccount', function(req,res,next){

  var name = req.body.name;
  var number = req.body.number;
  var date = req.body.date;
  var id =req.body.id;
  var gender = req.body.gender;
  var salary = req.body.salary;
  var adhar = req.body.adhar;
  var address= req.body.address;
  var nat=req.body.nat;
  var rel=req.body.rel;
  var gate=req.body.gate;
  var pass=req.body.pass;
  console.log(name,number,date,id,gender,salary,adhar,address,nat,rel,gate,pass)
  var sql = `INSERT INTO guard values ("${name}", "${number}", "${date}", "${id}", "${gender}", "${salary}", "${adhar}", "${address}", "${nat}", "${rel}", "${gate}", "${pass}")`;
 con.query(sql, function(err, result) {
   if (err) throw err;
   console.log('record inserted');
   //req.flash('success', 'Data added successfully!');
   res.redirect('/Admin');
 });
})

//Tenent input

app.post('/Account', function(req,res,next){

  var name = req.body.name;
  var number = req.body.number;
  var date = req.body.date;
  var gender = req.body.gender;
  var occ=req.body.occ;
  var nat=req.body.nat;
  var rel=req.body.rel;
  var fnum=req.body.fnum;
  var block=req.body.Block;
  var pass=req.body.pass;
  var id =req.body.id;
  //console.log(name,number,date,id,gender,salary,adhar,address,nat,rel,gate,pass)
  var sql = `INSERT INTO tenant values ("${name}", "${number}", "${date}", "${gender}", "${occ}", "${nat}", "${rel}", "${fnum}", "${block}", "${pass}", "${id}")`;
 con.query(sql, function(err, result) {
   if (err) throw err;
   console.log('record inserted');
   //req.flash('success', 'Data added successfully!');
   res.redirect('/Admin');
 });
})

// Get method for visitor

app.get('/visitor', function(req, res, next) {
  var sql='SELECT * FROM visitor';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('visitor', { title: 'visitor', visitor: data});
});
});


//GET METHOD FOR GUARD

app.get('/GuardProfile', function(req, res, next) {
  var sql='SELECT * FROM guard';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('GuardProfile', { title: 'guard', guard: data});
});
});

//DELETE FOR VISITOR
app.get('/Visitor/delete/:id', function(req, res, next) {
  var id= req.params.id;
  console.log(id)
   var sql = `DELETE FROM visitor WHERE TENANT_ID = ?`;
   con.query(sql, [id], function (err, data) {
   if (err) throw err;
   console.log(data.affectedRows + " record(s) updated");
 });
 res.redirect('/visitor');
 
});


// Rendering the pages

app.get('/Gurad',function(req,res){
  var sql=`SELECT * FROM GUARD WHERE GUARD_ID = ${AUTH}`;
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  console.log(data)
  console.log(data[0].NAME)
  res.render('Gurad', { title: 'Guard', data: data});
  })
})

app.get('', function (req, res) {
  res.render(__dirname+"/views/login.ejs");
     })
app.get('/Admin',function(req,res){
  var sql=`SELECT * FROM ADMIN WHERE ID = ${AUTH}`;
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  console.log(data)
  console.log(data[0].NAME)
  res.render('Admin', { title: 'ADMIN', data: data});
  })
})
app.get('/guardLogin',function(req,res){
      res.render("guardLogin");
  })
app.get('/myprofile',function(req,res){
  var sql=`SELECT * FROM TENANT WHERE ID = ${AUTH}`;
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  console.log(data)
  console.log(data[0].NAME)
  res.render('myprofile', { title: 'myprofile', data: data});
})
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
 app.get('/profile',function(req,res){
  res.render("profile");
})
 app.get('/TenantUpdate',function(req,res){
  res.render("TenantUpdate");
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