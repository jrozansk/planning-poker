var express = require('express');
var app = express();

const EventEmitter = require('events');
const port = 3000;

class MyEmitter extends EventEmitter {}

var numberOfClients = 0;
var myEmitter = new MyEmitter();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/clients', function(req, res) {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });

        myEmitter.on('join', () => {
          res.write('data: ' + numberOfClients + '\n\n');
        });
});

app.get('/join', function(req, res) {
        numberOfClients += 1;
        myEmitter.emit('join');
        res.sendStatus(200)
});

app.listen(port);
