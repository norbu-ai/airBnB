const express = require('express'); 
const router = express.Router(); 

const { setTokenCookie, requireAuth } = require('../../utils/auth'); 
const { User } = require('../../db/models'); 
const { Op } = require('sequelize'); 
const { validateSignup } = require('../../utils/inputValidators'); 


/* Sign up 
add the POST /api/users route to the router using an asynchronous route handler. 
In the route handler, call the signup static method on the User model. If the user 
is successfully created, then call setTokenCookie and return a JSON response with 
the user information. If the creation of the user is unsuccessful, then a Sequelize 
Validation error will be passed onto the next error-handling middleware.
*/
router.post('/', validateSignup, async(req, res) => {
    const { email, password, username, firstName, lastName } = req.body; 

    //grab either username or email, so we can throw error if duplicated 
    let user1 = await User.findOne({
        where: {
            [Op.or]: [{email}, {username}]
        }, 
        attributes: {
            include: ['email', 'username']
        }
    }); 

    // if user with that email already exist 
    if (user1 && (user1.email === email)){
        res.status(403); 
        res.json({
            message: "User already exist", 
            statusCode: 403, 
            errors: {
                email: "User with that email already exists"
            }
        })
    } 
    
    // if user with that username already exist 
    if (user1 && (user1.username === username)){
        res.status(403); 
        res.json({
            message: "User already exists", 
            statusCode: 403, 
            errors: {
                username: "User with that username already exists"
            }
        })
    }

    let user = await User.signup({ email, username, password, firstName, lastName }); 
    const token = await setTokenCookie(res, user); 
    user = user.toJSON(); //so we can manipulate
    user.token = token; 
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


router.get('/', async(req, res) => {
    const users = await User.findAll(); 
    return res.json({ users })
})




module.exports = router; 