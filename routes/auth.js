const express = require('express')
const router = express.Router()

// import controller
const { signup, accountActivation, signin, forgotPassword, resetPassword } = require('../controllers/auth')

// import validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator 
} = require('../validators/auth')
const { runValidation } = require('../validators/') // no need to write index

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);

// forgot reset password
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

module.exports = router; // {}

/**
 * app.get or router.get is a request.It has 2 arguments the endpoint and the callback function. The callback function has access to request and response objects.
 *  - The client side app can send request containing user data to /api/signup endpoint then do an action with the data
 *  - res.json is one of the many properties the res object have.
 * 
 * express.Router() will handle the routes
 * module.exports is an empty object by default. Each file in a Node.js project is treated as a module that can export values 
 *  - and functions to be used by other modules
 * 
 * Middleware(express-validator) is applied in the "/signup" route
 *  - It is applied before the request hits the controller, 
 *  - The request will not hit the controller if it did not pass the validation
 *  - userSignupValidator and runValidation are applied to /signup. The error/s will be handled by the runValidation middleware
 *  - The last parameter of "router.post('/signup', userSignupValidator, runValidation, signup)" is the controller
 * We will use .post if we want to post something back to the server. We will use .get if we want to get something from the server
 * signup, accountActivation and signin are methods in the controller
 * 
 * - Code flow for /forgot-password route:
 *  - Validators are applied when the user visits the /forgot-password route.
 *  - The request will not hit the controller if it did not pass the validation
 *  - The forgotPassword methood will be executed in the ../controllers/auth if validation passes
 * 
 */