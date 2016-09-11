var express = require('express');
var io = require('socket.io');
var app = express();
var session = require("express-session");

const port = 3000;

var clientsConnected = new Set();
var isPlanningActive = false;
var answers = {};
var sessionMiddleware = session({
    'secret' : Math.random().toString(36).slice(-8),
    'resave' : false,
    'saveUninitialized' : true
});

app.set('view engine', 'pug');
app.use(express.static('stylesheets'));
app.use(sessionMiddleware);

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/client', function(req, res) {
    var votingNeeded = isPlanningActive;
    if(req.session.id in answers) {
        votingNeeded = false;
    }
    res.render('client', {votingNeeded: votingNeeded});
});

app.get('/dashboard', function(req, res) {
    res.render('dashboard', {clientsQuantity: clientsConnected.length});
});

var server = app.listen(port);

sockets = io.listen(server, {'pingInterval': 2000, 'pingTimeout': 5000});
sockets.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

sockets.on('connection', function(socket) {
    console.log(socket.request.session.id);
    clientsConnected.add(socket.request.session.id)
    sockets.emit('clientsQuantityChange', {'quantity': clientsConnected.size});

    socket.on('disconnect', function() {
      clientsConnected.delete(socket.request.session.id)
      sockets.emit('clientsQuantityChange', {'quantity': clientsConnected.size}); 
    });
    
    socket.on('activate', function() {
      isPlanningActive = true;
      answers = {};
      socket.broadcast.emit('activate');
    });
    
    socket.on('vote', function(data) {
      if(socket.request.session.id in answers) {
        console.log(socket.request.session.id + ' voted already');
      } else {
        answers[socket.request.session.id] = data.estimation;
        socket.broadcast.emit('newVote', data);
      }
    });
});