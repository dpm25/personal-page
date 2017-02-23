let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let app = express();
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const mailUtil = require('./src/utils/mailUtil');

// set the static lib
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'node_modules/datamaps/dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set view engine and path to views
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

let nav = [{
    "id": "about-nav",
    "href": "/#about",
    "title": "About"
}, {
    "id": "contact-nav",
    "href": "/#contact",
    "title": "Contact"
}];

// set up country router for all requests to path /country-widget
let countryRouter = require('./src/routes/countryRouter')(nav);
app.use('/country-widget', countryRouter);

let todoRouter = require('./src/routes/todoRouter')(nav);
app.use('/todo', todoRouter);


app.get('/', function(req, res) {
    res.render('index', {
        nav: nav
    });
});

// post an email to account
app.post('/mailme', function(req, res) {
    // use mailUtil to send email and post data to dynamodb
    mailUtil.mailMe(req.body.inputEmail, req.body.comment, (err, response) => {
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

module.exports = app;
