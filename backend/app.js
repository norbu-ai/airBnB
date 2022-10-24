
const express = require('express'); 
require('express-async-errors'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const csurf = require('csurf'); 
const helmet = require('helmet'); 
const cookieParser = require('cookie-parser'); 


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
module.exports = app; 