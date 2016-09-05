var express = require('express');
var app = express();

const EventEmitter = require('events');
const port = 3000;

class MyEmitter extends EventEmitter {}

var myEmitter = new MyEmitter();
var numberOfClients = 0;

app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/client', function(req, res) {
        res.render('client');
});

app.get('/dashboard', function(req, res) {
        res.render('dashboard');
});

app.listen(port);
