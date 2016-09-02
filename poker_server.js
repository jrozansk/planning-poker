var express = require('express');
var app = express();

const port = 3000;

app.set('view engine', 'pug');
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/clients', function(req, res) {
        //req.socket.setTimeout(Infinity);
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        res.write('data:jrozansk\n\n');
});

app.listen(port);
