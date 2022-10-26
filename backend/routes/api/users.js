

const express = require('express'); 

const { setTokenCookie, requireAuth } = require('../../utils/auth'); 
const { User } = require('../../db/models'); 

const router = express.Router(); 


/* Sign up 
add the POST /api/users route to the router using an asynchronous route handler. 
In the route handler, call the signup static method on the User model. If the user 
is successfully created, then call setTokenCookie and return a JSON response with 
the user information. If the creation of the user is unsuccessful, then a Sequelize 
Validation error will be passed onto the next error-handling middleware.
*/
router.post('/', async(req, res) => {
    const { email, password, username } = req.body; 
    const user = await User.signup({ email, username, password }); 
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




module.exports = router; 