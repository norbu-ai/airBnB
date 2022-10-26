

const express = require('express'); 

const { setTokenCookie, restoreUser } = require('../../utils/auth'); 
const { User } = require('../../db/models'); 

const router = express.Router(); 


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
    } else return res.json({ })
}); 


/* Log in:
add the POST /api/session route to the router using an asynchronous route handler. 
In the route handler, call the login static method from the User model. If there 
is a user returned from the login static method, then call setTokenCookie and return 
a JSON response with the user information. If there is no user returned from the login 
static method, then create a "Login failed" error and invoke the next error-handling 
middleware with it.
*/
router.post('/', async(req, res, next) => {
    const { credential, password } = req.body; 
    const user = await User.login({ credential, password }); 
    if (!user){
        const err = new Error('Login failed'); 
        err.status = 401; 
        err.title = 'Login failed'; 
        err.errors = ['The provided credentials were invalid.']; 
        return next(err); 
    }
    await setTokenCookie(res, user); 
    return res.json({ user }); 
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