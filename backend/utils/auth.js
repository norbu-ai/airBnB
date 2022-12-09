const jwt = require('jsonwebtoken'); 
const { jwtConfig } = require('../config'); //database configuration
const { User } = require('../db/models');   //use model methods 
const { secret, expiresIn } = jwtConfig;   //use what's in 'config' folder 


// auth helper functions: authentication middlewares 

/* function used in the login/signup routes 
// setting jwt cookie after a user is logged in or signed up:  
takes in the response and the session user and generates a JWT using the 
imported secret. It is set to expire in however many seconds you set on 
the JWT_EXPIRES_IN key in the .env file. The payload of the JWT will be 
the return of the instance method .toSafeObject that you added previously 
to the User model. After the JWT is created, it's set to an HTTP-only cookie 
on the response as a token cookie.
*/
// add token used to authenticate a user 
const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        {data: user.toSafeObject()}, 
        secret, 
        {expiresIn: parseInt(expiresIn)} 
    ); 
    const isProduction = process.env.NODE_ENV === "production"; 

    // set the token cookie 
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, //convert ms to sec 
        httpOnly: true, 
        secure: isProduction, 
        sameSite: isProduction && "Lax"
    }); 
    return token; 
}; 

/*
// parse jwt cookie for the token to restore authentication for current session user: 
    verify and parse the JWT's payload and search the database for a User with the id 
    in the payload. (This query should use the currentUser scope since the hashedPassword 
    is not needed for this operation.) If there is a User found, then save the user to 
    a key of user onto the Request, req.user. If there is an error verifying the JWT 
    or a User cannot be found with the id, then clear the token cookie from the response 
    and set req.user to null.
*/
// restoreUser middleware will be connected to the API router so that all 
// API routehandlers will check if there is a current user logged in or not. 
// use cookie-token to match current user, if found, add 'user' to req as req.user 
const restoreUser = (req, res, next) => {

    const { token } = req.cookies; 
    req.user = null; 

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if(err) {
            return next(); 
        }

        try {
            const { id } = jwtPayload.data; 
            req.user = await User.scope('currentUser').findByPk(id); 
        } catch (e) {
            res.clearCookie('token'); 
            return next(); 
        }

        if(!req.user) res.clearCookie('token'); 
        return next(); 
    }); 
}; 


/* 
define this middleware as an array with the restoreUser middleware function you just 
created as the first element in the array. This will ensure that if a valid JWT cookie
exists, the session user will be loaded into the req.user attribute. The second 
middleware will check req.user and will go to the next middleware if there is a 
session user present there. If there is no session user, then an error will be 
created and passed along to the error-handling middlewares.
*/
/* requireAuth middleware: requires a session user to be authenticated before 
accessing a route; requireAuth will be connected directly to routehandlers where 
there needs to be a current user logged in for the actions in those routehandlers
*/
// if there is no current user, return an error 
const requireAuth = function(req, res, next) {
    if (req.user) return next(); 
    res.status(401); 
    return res.json({
        message: "Authentication required", 
        statusCode: 401
    })
    // const err = new Error('Unauthorized'); 
    // err.title = 'Unauthorized'; 
    // err.errors = ['Unauthorized']; 
    // err.status = 401; 
    // return next(err); 
}; 







module.exports = { setTokenCookie, restoreUser, requireAuth }; 