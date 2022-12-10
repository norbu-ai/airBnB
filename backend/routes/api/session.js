
const express = require('express'); 
const router = express.Router(); 

const { setTokenCookie, restoreUser } = require('../../utils/auth'); 
const { User } = require('../../db/models'); 
const { validateLogin } = require('../../utils/inputValidators')



/* Get session User API route: 
return the session user info as JSON under the key of user if you have a token cookie,
if there is not a session or token cookie, JSON with an empty object is returned. 
to get the session user, connect the restoreUser middleware.
*/
// restore session user 
router.get('/', restoreUser, (req, res) => {
    const { user } = req; 
    if(user) {
        return res.json({
            user: user.toSafeObject()
        }); 
    } else {
        return res.json({
            user: null
        })
    }
}); 


/* Log in:
add the POST /api/session route to the router using an asynchronous route handler. 
In the route handler, call the login static method from the User model. If there 
is a user returned from the login static method, then call setTokenCookie and return 
a JSON response with the user information. If there is no user returned from the login 
static method, then create a "Login failed" error and invoke the next error-handling 
middleware with it.
*/

router.post('/', validateLogin, async(req, res, ) => {

    const {credential, password} = req.body; 

    const user = await User.login({ credential, password })

    if(!credential || !password) {
        res.status(400)
        return res.json({
            'message': 'Validation error', 
            'statusCode': 400, 
            'errors': {
                'credential': 'Email or username is required', 
                'password': 'Password is required'
            }
        })
    }

    if (!user) {
        res.status(401)
        return res.json({
            'message': 'Invalid credentials', 
            'statusCode': 401
        })
    }

    // const token = await setTokenCookie(res, user); 

    const userObj = user.toJSON(); 
    // userObj.token = token; 
    delete userObj.createdAt
    delete userObj.updatedAt 
    return res.json(userObj)
})



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