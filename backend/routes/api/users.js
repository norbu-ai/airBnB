

const express = require('express'); 

const { setTokenCookie, requireAuth } = require('../../utils/auth'); 
const { User } = require('../../db/models'); 
const { check } = require('express-validator'); 
const { handleValidationErrors } = require('../../utils/validation'); 

const router = express.Router(); 

/* validateSignup middleware: check & validate req.body for signup: 
validateSignup middleware is composed of the check and handleValidationErrors middleware. 
It checks to see if req.body.email exists and is an email, req.body.username is a minimum 
length of 4 and is not an email, and req.body.password is not empty and has a minimum length 
of 6. If at least one of the req.body values fail the check, an error will be returned as the response.
*/
const validateSignup = [
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Please provide a valid email.'), 
    check('username').exists({checkFalsy: true}).isLength({min:4}).withMessage('Please provide a username with at least 4 characters.'), 
    check('username').not().isEmail().withMessage('Username cannot be an email.'), 
    check('password').exists({checkFalsy: true}).isLength({min:6}).withMessage('Password must be 6 characters or more.'), 
    check('firstName').exists({checkFalsy: true}).notEmpty().withMessage('First name is required'), 
    check('lastName').exists({checkFalsy: true}).notEmpty().withMessage('Last name is required'), 
    handleValidationErrors
]; 

/* Sign up 
add the POST /api/users route to the router using an asynchronous route handler. 
In the route handler, call the signup static method on the User model. If the user 
is successfully created, then call setTokenCookie and return a JSON response with 
the user information. If the creation of the user is unsuccessful, then a Sequelize 
Validation error will be passed onto the next error-handling middleware.
*/
router.post('/', validateSignup, async(req, res) => {
    const { email, password, username, firstName, lastName } = req.body; 
    const user = await User.signup({ email, username, password, firstName, lastName }); 
    await setTokenCookie(res, user); 
    return res.json({ user }); 
}); 

/* test the Signup route: 
    fetch('/api/users', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        email: 'spidey@spider.man',
        username: 'Spidey',
        password: 'password'
    })
    }).then(res => res.json()).then(data => console.log(data));
*/

/* test validateSignup middleware leaving req.body.password empty
    fetch('/api/users', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
        email: 'firestar@spider.man',
        username: 'Firestar',
        password: ''
    })
    }).then(res => res.json()).then(data => console.log(data));
*/



module.exports = router; 