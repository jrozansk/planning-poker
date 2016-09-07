var express = require('express');
var io = require('socket.io');
var app = express();

const EventEmitter = require('events');
const port = 3000;

class MyEmitter extends EventEmitter {}

var myEmitter = new MyEmitter();
var realClients = [];

app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/client', function(req, res) {
    res.render('client');
});

app.get('/dashboard', function(req, res) {
    res.render('dashboard', {clientsQuantity: realClients.length});
});

var server = app.listen(port);
sockets = io.listen(server, {'pingInterval': 2000, 'pingTimeout': 5000});

sockets.on('connection', function(socket) {
   var dataPassed = socket.request;
   if(dataPassed._query['isItRealClient'] == 'true') {
       realClients.push(dataPassed._query['t'])
       sockets.emit('clientsQuantityChange', {'quantity': realClients.length});
   }

   socket.on('disconnect', function() {
     socketPos = realClients.indexOf(dataPassed._query['t']);
     if(socketPos != -1) {
        realClients.splice(socketPos, 1)
        sockets.emit('clientsQuantityChange', {'quantity': realClients.length}); 
     }
   });
});