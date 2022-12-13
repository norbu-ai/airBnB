
const { check } = require('express-validator'); 
const { handleValidationErrors } = require('./validation'); 


/* validateSignup middleware: check & validate req.body for signup: 
validateSignup middleware is composed of the check and handleValidationErrors middleware. 
It checks to see if req.body.email exists and is an email, req.body.username is a minimum 
length of 4 and is not an email, and req.body.password is not empty and has a minimum length 
of 6. If at least one of the req.body values fail the check, an error will be returned as the response.
*/
const validateSignup = [
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Invalid email'), 
    check('password').exists({checkFalsy: true}).withMessage('Password is required'),
    // check('password')exists({checkFalsy: true}).withMessage('Password is required').isLength({min:6}).withMessage('Password must have at least 6 characters'), 
    check('username').exists({checkFalsy: true}).withMessage('Username is required').not().isEmail().withMessage('Username cannot be an email'), 
    check('firstName').exists({checkFalsy: true}).notEmpty().withMessage('First Name is required'), 
    check('lastName').exists({checkFalsy: true}).notEmpty().withMessage('Last Name is required'), 
    handleValidationErrors
]; 


// validateLogin middleware: 
// use both check & handleValidationErrors middleware to validate req.body
const validateLogin = [
    check('credential').notEmpty().withMessage('Email or username is required'), 
    check('password').notEmpty().withMessage('Password is required'), 
    handleValidationErrors
]; 


// express validation of user input in Spot (issue: lat, lng)
const validateSpot = [
    check('address').exists({checkFalsy: true}).notEmpty().withMessage('Street address is required'), 
    check('city').exists({checkfalsy: true}).notEmpty().withMessage('City is required'), 
    check('state').exists({checkfalsy: true}).notEmpty().withMessage('State is required'), 
    check('country').exists({checkfalsy: true}).notEmpty().withMessage('Country is required'), 

    check('lat').exists({checkfalsy: true}).notEmpty().withMessage('Latitude is not valid'), 
    check('lng').exists({checkfalsy: true}).notEmpty().withMessage('Longitude is not valid'), 

    check('name').exists({checkFalsy: true}).notEmpty().isLength({min:1}, {max:49}).withMessage('Name must be less than 50 characters'), 
    check('description').exists({checkFalsy: true}).notEmpty().withMessage('Description is required'), 
    check('price').exists({checkFalsy: true}).notEmpty().withMessage('Price per day is required'), 
    handleValidationErrors
]; 


// express validation of user input in Review
const validateReview = [
    check('review').exists({checkFalsy: true}).withMessage('Review text is required'), 
    check('stars').exists({checkFalsy: true}).withMessage('Stars is required').isInt({min:1}, {max:5}).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]; 



// express validation of user inputs in query to Spot with pagination and queryFilter applied
const validatePagination = [
    check("page").optional().isInt({ min: 1 }, { max: 10 }).withMessage("Page must be greater than or equal to 1"),
    check("size").optional().isInt({ min: 1 }, { max: 20 }).withMessage("Size must be greater than or equal to 1"),
    check("minLat").optional().isDecimal().withMessage("Minimum latitude is invalid",),
    check("maxLat").optional().isDecimal().withMessage("Maximum latitude is invalid",),
    check("minLng").optional().isDecimal().withMessage("Minimum longitude is invalid"),
    check("maxLng").optional().isDecimal().withMessage("Maximum longitude is invalid"),
    check("minPrice").optional().isDecimal({ min: 0 }).withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice").optional().isDecimal({ min: 0 }).withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
]; 




module.exports = {
    validateSignup, 
    validateLogin, 
    validateSpot, 
    validateReview, 
    validatePagination
}