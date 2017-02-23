//dynamo store util
const DynamoStore = require('./dynamoStoreUtil');

module.exports = {
    // export the anonymous mailme function
    mailMe: function(email, comment, callback) {
        if (validate(email)) {
            DynamoStore.getItem('contacts', 'email', email, (err, data) => {
                if (err) {
                    console.log(err); // an error occurred
                } else {
                    if (Object.keys(data).length === 0 && data.constructor === Object) {
                        // attempt to put email and comment into dynamoDB
                        DynamoStore.putItem('contacts', {
                            email: email,
                            comment: comment
                        }, (err, response) => {
                            if (err) {
                                return callback(err, response);
                            } else {
                                return callback(null, response);
                            }
                        });
                    } else {
                      console.log('email exists');
                      return callback(null, 'EMAIL_EXISTS');
                    }
                }
            });
        } else {
            callback('bad email!', null);
        }
    }
}

function validate(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
