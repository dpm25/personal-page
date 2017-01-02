//dynamo store util
const DynamoStore = require('./dynamoStoreUtil');

// node mailer and SimpleEmailService (aws)
let nodemailer = require('nodemailer');
let sesTransport = require('nodemailer-ses-transport');

module.exports = {
    // export the anonymous mailme function
    mailme: function(email, comment, callback) {
        if (validate(email)) {

            // attempt to put email and comment into dynamoDB
            DynamoStore.putItem('contacts', {
                email: email,
                comment: comment
            }, (err, response) => {
                if (err) {
                    return callback(err, response);
                }
            });

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(sesTransport({
                accessKeyId: process.env.KEY,
                secretAccessKey: process.env.SECRET,
                rateLimit: 1 // do not send more than 1 messages in a second
            }));

            // setup e-mail data with unicode symbols
            let mailOptions = {
                from: '"Dan Mahoney" <dan.mahoney.development@gmail.com>', // sender address
                to: 'dan.mahoney.development@gmail.com', // list of receivers
                subject: 'WEBSITE: ' + email, // Subject line
                text: comment, // plaintext body
                html: '<h3>' + comment + '</h3>' // html body
            };

            // send the email and handle teh response in callback
            transporter.sendMail(mailOptions, (error, info) => {
                return callback(error, info);
            });
        } else {
            console.log('invaild email!');
            callback('bad email!', null);
        }
    }
}

function validate(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
