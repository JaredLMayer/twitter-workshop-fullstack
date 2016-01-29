var express = require('express');
var app = express(); 
var morgan = require('morgan');
var swig = require('swig');
var engines = require('consolidate');
app.engine('html', engines.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    console.log(output);
});

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
	res.render('index', {'title': 'This is home'});
});

app.use('/news', require('./news-router'));

