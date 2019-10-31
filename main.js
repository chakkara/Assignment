var express = require('express');
var app = express();
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/database'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "Connection failed!")); 
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/display', function(req, res) {
  db.collection("collect").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.render('display',{result:result});
    db.close;
});});
app.post('/', function(req,res){ 
  var name = req.body.name;
  var email= req.body.email;
  var phone=req.body.phone;
  var names=req.body.names;  
  var write={"name": name,"email":email,"phone":phone,"names":names}
  db.collection('collect').insertOne(write,function(err, collection){ 
    if (err) throw err; 
    console.log("Inserted!"); 
    db.close;
});});
app.listen(8080);