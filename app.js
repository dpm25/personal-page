// import express module
var express = require('express');
// make express module global
var app = module.exports = express();
// body-parser
var bodyParser = require('body-parser');
// node mailer library
var nodemailer = require('nodemailer');

// set the static lib
app.use(express.static('assets'));
app.use(express.static('node_modules/datamaps/dist/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// set view engine and path to views
app.set('view engine', 'ejs');
app.set('views', './src/views');

var nav = [{
    "id": "about-nav",
    "href": "/#about",
    "title": "About"
}, {
    "id": "contact-nav",
    "href": "/#contact",
    "title": "Contact"
}];

var countryRouter = require('./src/routes/countryRouter')(nav);
app.use('/country-widget', countryRouter);

app.get('/', function(req, res) {
    res.render('index', {
        nav: nav
    });
});

app.post('/mailme', function(req, res) {
    console.log('name: ' + req.body.name + ' email: ' + req.body.inputEmail + ' comment: ' + req.body.comment);
    res.redirect(301, '/');
});

// set PORT to env or default to 3000
// and set app to list on that port
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('runnning server on port: ' + port);
});
