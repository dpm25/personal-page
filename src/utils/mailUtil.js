//dynamo store util
const DynamoStore = require('./dynamoStoreUtil');

// node mailer and SimpleEmailService (aws)
let nodemailer = require('nodemailer');
let sesTransport = require('nodemailer-ses-transport');

module.exports = {
    // export the anonymous mailme function
    mailme: function(email, comment, callback) {
        if (validate(email)) {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(sesTransport({
                accessKeyId: process.env.KEY,
                secretAccessKey: process.env.SECRET,
                rateLimit: 1 // do not send more than 1 messages in a second
            }));

            // setup e-mail data with unicode symbols
            let mailOptions = {
                from: '"Dan Mahoney" <dan.mahoney.development@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Thanks For Reaching Out!!!', // Subject line
                text: 'I will be sure to respond to your inquiry as soon as I can...Thanks again!', // plaintext body
                html: '<h3>I will be sure to respond to your inquiry as soon as I can...Thanks again!</h3>' // html body
            };

            // send the email and handle teh response in callback
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    callback(error, info);
                } else {
                    console.log(info);
                    DynamoStore.putItem('contacts', {
                        email: email,
                        comment: comment
                    }, (err, response) => {
                        callback(err, response);
                    });
                }
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
