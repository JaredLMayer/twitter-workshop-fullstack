var express = require('express');
var app = express(); 

app.listen(3000, function(){
	console.log("hello");
});

app.get('/', function (req, res){
	res.send("hello again");
})