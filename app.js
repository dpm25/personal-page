// import express module
var express = require('express');
// make express module global
var app = module.exports = express();
// body-parser
var bodyParser = require('body-parser');
// node mailer
var nodemailer = require('nodemailer');
// mail util
var mailUtil = require('./src/utils/mailUtil');

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

// set up country wideget router for all requests to path /country-widget
var countryRouter = require('./src/routes/countryRouter')(nav);
app.use('/country-widget', countryRouter);

app.get('/', function(req, res) {
    res.render('index', {
        nav: nav
    });
});

// post an email to account
app.post('/mailme', function(req, res) {
    // validate the email address and prepare to send the email
    if (mailUtil.validateEmail(req.body.inputEmail)) {
        // create reusable transporter object using the default SMTP transport
        //var transporter = nodemailer.createTransport('smtps://dan.mahoney.development%40gmail.com:p!ttp%40nth3r@smtp.gmail.com');
        var transporter = nodemailer.createTransport('smtps://' + process.env.EMAIL + ':' + process.env.PASS + '@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Dan Mahoney" <dan.mahoney.development@gmail.com>', // sender address
            to: 'dan.mahoney.development@gmail.com', // list of receivers
            subject: 'Website Message From: ' + req.body.inputEmail, // Subject line
            //text: req.body.comment, // plaintext body
            html: mailUtil.safeTagReplace(req.body.comment) // html body
        };

        // send the email and handle teh response in callback
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('successful email');
        });

        res.redirect(301, '/');
    } else {
        console.log('invaild email!');
    }
});

// set PORT to env or default to 3000
// and set app to list on that port
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('runnning server on port: ' + port);
});
