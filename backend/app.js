
const express = require('express'); 
require('express-async-errors');    //errorhandling in asynchrnous routhandlers 
const morgan = require('morgan'); 
const cors = require('cors'); 
const csurf = require('csurf'); 
const helmet = require('helmet'); 
const cookieParser = require('cookie-parser'); 

const { ValidationError } = require('sequelize'); 
const { environment } = require('./config'); 
const isProduction = environment === 'production'; 

const routes = require('./routes'); 

const app = express(); 


app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(express.json()); 


/*
The csurf middleware will add a _csrf cookie that is HTTP-only 
(can't be read by JavaScript) to any server response. It also adds 
a method on all requests (req.csrfToken) that will be set to another 
cookie (XSRF-TOKEN) later on. These two cookies work together to provide 
CSRF (Cross-Site Request Forgery) protection for your application. 
The XSRF-TOKEN cookie value needs to be sent in the header of any request 
with all HTTP verbs besides GET. This header will be used to validate 
the _csrf cookie to confirm that the request comes from your site and 
not an unauthorized site.
*/

// Security Middleware 
if (!isProduction) {
    // enable cors only in development 
    app.use(cors())
}

// helmet helps set a variety of headers to better secure your app 
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
); 

// Set the _csrf token and create req.csrfToken() method used in routes/index.js file 
app.use(
    csurf({
        cookie: {
            secure: isProduction, 
            sameSite: isProduction && "Lax", 
            httpOnly: true 
        }
    })
); 


/*
Add the routes to the Express application by importing with the other imports 
in backend/app.js and connecting the exported router to app after all the middlewares.
*/

app.use(routes)

// resource-not-found errorhandler middleware 
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found."); 
    err.title = "Resource Not Found"; 
    err.errors = ["The requested resource couldn't be found."]; 
    err.status = 404; 
    next(err); 
}); 

/*
If the error that caused this error-handler to be called is an instance of 
ValidationError from the sequelize package, then the error was created from a 
Sequelize database validation error and the additional keys of title string and 
errors array will be added to the error and passed into the next error handling middleware.
*/
// Sequelize errorhandler: catches Sequelize errors and formatting them before sending error response 
// Sequelize errorhandler test needs Sequelize models 
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error: 
    if (err instanceof ValidationError){
        err.errors = err.errors.map((e) => e.message); 
        err.title = 'Validation error'; 
    }; 
    next(err); 
}); 


/*
The last error handler is for formatting all the errors before returning a JSON response. 
It will include the error message, the errors array, and the error stack trace 
(if the environment is in development) with the status code of the error message.
*/
// error-formatter errorhandler 
app.use((err, _req, res, _next) => {
    res.status(err.status || 500); 
    console.error(err); 
    res.json({
        title: err.title || 'Server Error', 
        message: err.message, 
        errors: err.errors, 
        stack: isProduction ? null : err.stack
    }); 
}); 



/* error output for notfound resource endpoint i.e. localhost:8000/not-found

{
title: "Resource Not Found",
message: "The requested resource couldn't be found.",
errors: [
"The requested resource couldn't be found."
],
stack: "Error: The requested resource couldn't be found.
    at /Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/app.js:70:17
    at newFn (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express-async-errors/index.js:16:20)
    at Layer.handle [as handle_request] (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:328:13)
    at /Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:280:10)
    at /Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:646:15
    at next (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:265:14)
    at Function.handle (/Users/sigmaepsilon/Desktop/app-academy/mod04/practice-resource/week13-project/AirBnB-API-server/authenticate-me/backend/node_modules/express/lib/router/index.js:175:3)"
}

*/


















module.exports = app; 