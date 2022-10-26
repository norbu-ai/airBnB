

const express = require('express'); 

const { setTokenCookie, restoreUser } = require('../../utils/auth'); 
const { User } = require('../../db/models'); 
const { check } = require('express-validator'); 
const { handleValidationErrors } = require('../../utils/validation'); 

const router = express.Router(); 

// validateLogin middleware: 
// use both check & handleValidationErrors middleware to validate req.body
// const validateLogin = [
//     check('credential').exists({ checkFalsy: true }).notEmpty().withMessage('Please provide a valid email or username.'), 
//     check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.'), 
//     handleValidationErrors
// ]; 
// logan solution 
const validateLogin = [
    check('credential')
        .custom(credential => {
            if(typeof credential !== 'string'){
                throw new Error('Invalid credential')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .custom(password => {
            if(typeof password !== 'string'){
                throw new Error('Invalid password')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];


/* Get session User API route: 
return the session user info as JSON under the key of user if you have a token cookie,
if there is not a session or token cookie, JSON with an empty object is returned. 
to get the session user, connect the restoreUser middleware.
*/
// restore session user 
router.get('/', restoreUser, (req, res) => {
    const { user } = req; 
    if(user) {
        return res.json(user.toSafeObject()); 
    } else return res.json(null)
}); 


/* Log in:
add the POST /api/session route to the router using an asynchronous route handler. 
In the route handler, call the login static method from the User model. If there 
is a user returned from the login static method, then call setTokenCookie and return 
a JSON response with the user information. If there is no user returned from the login 
static method, then create a "Login failed" error and invoke the next error-handling 
middleware with it.
*/
router.post('/', validateLogin, async(req, res, next) => {
    const { credential, password } = req.body; 
    const user = await User.login({ credential, password }); 
    if (!user){
        res.status(401);
        return res.json({
            message: "Invalid credentials", 
            statusCode: 401
        })
    }
    const token = await setTokenCookie(res, user); 
    userObj = user.toJSON(); //so we can manipulate the user object
    userObj.token = token; 
    return res.json(userObj); 
}); 

/* test login using 'username' credential 
    fetch('/api/session', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
    }).then(res => res.json()).then(data => console.log(data));
*/

/* test login using 'email' credential 
   fetch('/api/session', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
    }).then(res => res.json()).then(data => console.log(data));
*/

/* test if validateLogin middleware checks for empty credential 
    fetch('/api/session', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({ credential: '', password: 'password' })
    }).then(res => res.json()).then(data => console.log(data));
*/

/* test if validateLogin middleware checks for empty password 
    fetch('/api/session', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({ credential: 'Demo-lition', password: '' })
    }).then(res => res.json()).then(data => console.log(data));
*/



// Logout: remove the token cookie from the response and return a JSON success msg
router.delete('/', (_req, res) => {
    res.clearCookie('token'); 
    return res.json({ message: 'success' })
}); 

/* test logout 
    fetch('/api/session', {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    }
    }).then(res => res.json()).then(data => console.log(data));
*/



module.exports = router; 