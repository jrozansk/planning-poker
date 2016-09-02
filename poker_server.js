var express = require('express');
var app = express();

const port = 3000;

app.set('view engine', 'pug');
app.get('/', function(req, res) {
	res.render('index');
});

app.listen(port);
