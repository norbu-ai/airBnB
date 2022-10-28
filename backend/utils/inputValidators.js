
const { check } = require('express-validator'); 
const { handleValidationErrors } = require('./validation'); 


/* validateSignup middleware: check & validate req.body for signup: 
validateSignup middleware is composed of the check and handleValidationErrors middleware. 
It checks to see if req.body.email exists and is an email, req.body.username is a minimum 
length of 4 and is not an email, and req.body.password is not empty and has a minimum length 
of 6. If at least one of the req.body values fail the check, an error will be returned as the response.
*/
const validateSignup = [
    check('email').exists({checkFalsy: true}).withMessage('Invalid email').isEmail().withMessage('Please provide a valid email.'),
    check('username').exists({checkFalsy: true}).withMessage('Username is required').isLength({min:4}).withMessage('Please provide a username with at least 4 characters.'), 
    check('username').not().isEmail().withMessage('Username cannot be an email.'), 
    check('firstName').exists({checkFalsy: true}).notEmpty().withMessage('First name is required'), 
    check('lastName').exists({checkFalsy: true}).notEmpty().withMessage('Last name is required'), 
    check('password').exists({checkFalsy: true}).withMessage('Password is required').isLength({min:6}).withMessage('Password must be 6 characters or more.'), 
    handleValidationErrors
]; 


// validateLogin middleware: 
// use both check & handleValidationErrors middleware to validate req.body
const validateLogin = [
    check('credential').custom(credential => { 
        if(typeof credential !== 'string'){ 
            throw new Error('Invalid credential')
        } 
        return true
    }).notEmpty().withMessage('Email or username is required'), 

    check('password').custom(password => {
        if (typeof password !== 'string'){
            throw new Error('Invalid password')
        }
        return true; 
    }).notEmpty().withMessage('Password is required'), 
    
    handleValidationErrors
]; 


// express validation of user input in Spot
const validateSpot = [
    check('address').exists({checkFalsy: true}).withMessage('Street address is required'), 
    check('city').exists({checkfalsy: true}).withMessage('City is required'), 
    check('state').exists({checkfalsy: true}).withMessage('State is required'), 
    check('country').exists({checkfalsy: true}).withMessage('Country is required'), 
    check('lat').exists({checkfalsy: true}).withMessage('Latitude is required').isLength({min:-90, max:90}).withMessage('Latitude is not valid'), 
    check('lng').exists({checkfalsy: true}).withMessage('Longitude is required').isLength({min:-180, max:180}).withMessage('Longitude is not valid'), 
    check('name').exists({checkFalsy: true}).withMessage('Name is required'), 
    check('description').exists({checkFalsy: true}).withMessage('Description is required'), 
    check('price').exists({checkFalsy: true}).withMessage('Price per day is required'), 
    handleValidationErrors
]; 

// express validation of user input in Review
const validateReview = [
    check('review').exists({checkFalsy: true}).withMessage('Review text is required'), 
    check('stars').exists({checkFalsy: true}).withMessage('Stars is required').isInt({min:1, max:5}).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]; 



module.exports = {
    validateSignup, 
    validateLogin, 
    validateSpot, 
    validateReview, 
}