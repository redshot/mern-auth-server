const User = require('../models/user') // import the user model

exports.signup = (req, res) => {

}

/**
 * We are going to take all the user information then send them an email and only when they click the email the account is created for them.
 *  - We are doing this to avoid spam users
 * We will first make sure that the new user that will be saved in the database is not existing through User.findOne({email})
 *  - .findOne is a mongoose method. .findOne() will stop as soon as it finds as compared to .find() where it continues to search for all the records.
 *  - We can use a callback function within .exec() function. 
 *  - .success contains the user information if saved successfully
 * User.findOne({ email }) and newUser(variable) got converted into async/promises because of "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
 *  - I think what happened is that newUser is also invoked at the same time with User.findOne({ email })
 *  
 * The signup functionality uses the email confirmation concept.(Email confirmation workflow)
 *  - When they want to signup, we will send them an email
 *  - If they used valid email(not existing in db) only then they will be able to see the confirmation.
 *  - On that email we will send the user signup information encoded in jwt. There will also be a url link
 *  - Upon clicking on that url, they will taken to our clint/react app where we will grab the encoded jwt which contains user info
 *  - Then we make a request to backend using our react app so that user is finally saved in the database 
 * Sendgrid is used to send the user an email and encode the jwt
 * 
 */