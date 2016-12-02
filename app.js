// import express module
var express = require('express');
// make express module global
var app = module.exports = express();
// body-parser
var bodyParser = require('body-parser');

// set the static lib
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// set view engine and path to views
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', function(req, res) {
    res.render('index');
});

// set PORT to env or default to 3000
// and set app to list on that port
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('runnning server on port: ' + port);
});
