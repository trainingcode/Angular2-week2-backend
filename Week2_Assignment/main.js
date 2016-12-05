
var http = require("http");
var express = require("express");
var path = require('path');

var app = express();
var bodyParser = require('body-parser');
var employees = [{"firstName":"Ramu","lastName":"R","gender":"male"},{"firstName":"Midhun","lastName":"M","gender":"male"}];

app.set('views',path.join(__dirname + "/views"));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/client")));

app.get('/',function(req,res,next){
	console.log("Request");
	res.render("index.html");
	});

app.get('/getEmployee',function(req,res){
	console.log("Received getEmployee"+employees);
	res.json(employees);
});

app.post('/addNewEmployee',function(req,res){
		console.log("Received addNewEmployee"+req.body);
		var fName = req.body.firstname;
		var lName = req.body.lastname;
		var gender = req.body.gender;
		var newEmployee = {"firstName":fName,"lastName":lName,"gender":gender};
		console.log("newEmployee "+newEmployee);
		employees.push(newEmployee);
		res.json(employees);
});

app.delete('/removeEmployee/:firstName',function(req,res){
	console.log("Received removeEmployee "+req.params.firstName);
	var fName = req.params.firstName;
	for (var i = 0; i < employees.length; i++){
		if (employees[i].firstName == fName){
			console.log("Found Employee "+employees[i].firstName);
			employees.splice(i, 1); 
		}
	}
	res.json(employees);
});

app.put('/updateEmployee/:firstname',function(req,res){
	console.log("Received updateEmployee "+req.params.firstname);
	var fName = req.body.firstname;
	var lName = req.body.lastname;
	var gender = req.body.gender;
	for (var i = 0; i < employees.length; i++){
		if (employees[i].firstName == fName){
			console.log("Found Employee "+employees[i].firstName);
			employees[i].lastName = lName;
			employees[i].gender = gender;
		}
	}
	res.json(employees);
});

app.listen(8888);
console.log("Welcome to Node");