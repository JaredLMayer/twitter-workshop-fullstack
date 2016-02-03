var express = require('express');
var app = express(); 
var morgan = require('morgan');
var swig = require('swig');
	swig.setDefaults({ cache: false });
var engines = require('consolidate');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


app.engine('html', engines.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// app.use(function (req, res) {
  // res.setHeader('Content-Type', 'text/plain')
  // res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })


var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    // console.log(output);
});

var server = app.listen(3000, function(){
	// console.log("hello");
});
var io = socketio.listen(server);
app.use('/', routes(io));

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

app.get('/', function (req, res){
	res.render('index', {title: 'Hall of Fame', people: people});
});


