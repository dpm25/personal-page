// import express module
let express = require('express');
// make express module global
let app = module.exports = express();
// body-parser
let bodyParser = require('body-parser');
// mail util
const mailUtil = require('./src/utils/mailUtil');

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
    // use mailUtil to send email and post data to dynamodb
    mailUtil.mailme(req.body.inputEmail, req.body.comment, (err, response) => {
        if (err) {
            res.redirect(500, '/');
        } else if (response === 'EMAIL_EXISTS') {
            res.redirect(202, '/');
        } else {
            res.redirect(200, '/');
        }
    });
});

// set PORT to env or default to 3000
// and set app to list on that port
let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('runnning server on port: ' + port);
});
