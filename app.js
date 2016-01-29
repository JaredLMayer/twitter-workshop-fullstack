var express = require('express');
var app = express(); 
var morgan = require('morgan');

app.listen(3000, function(){
	console.log("hello");
});

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.use('/special', function(req, res){
	res.send("You've reached the special area");
});

app.get('/', function (req, res){
	res.send("hello again");
});

app.use('/news', require('./news-router'));