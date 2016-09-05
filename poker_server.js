var express = require('express');
var io = require('socket.io');
var app = express();

const EventEmitter = require('events');
const port = 3000;

class MyEmitter extends EventEmitter {}

var myEmitter = new MyEmitter();

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

var server = app.listen(port);
sockets = io.listen(server);

sockets.on('connection', function(socket) {
   sockets.emit('clientsQuantityChange', {'quantity': sockets.engine.clientsCount});
   socket.on('disconnect', function(socket) {
     sockets.emit('clientsQuantityChange', {'quantity': sockets.engine.clientsCount}); 
   });
});