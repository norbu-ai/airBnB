

const express = require('express'); 
const router = express.Router(); 

// all of the URLs of the routes in the 'apiRouter' will be prefixed with /api
const apiRouter = require('./api'); 
router.use('/api', apiRouter); 


/* --------------- instruction from w15 React-Redux ---------------- */


// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
        });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
    });
}







/********* code from frontend instruction *********/

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    });

    // Add a XSRF-TOKEN cookie in development
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
}


/*************************************************/

/* test endpoint: 
In this test route, you are setting a cookie on the response with the name of 
XSRF-TOKEN to the value of the req.csrfToken method's return. Then, you are 
sending the text, Hello World! as the response's body.
*/
router.get('/hello/world', function(req, res){
    res.cookie('XSRF-TOKEN', req.csrfToken()); 
    res.json({
        'message': "hello world", 
        'xsrf-token': req.csrfToken()
    })
}); 



// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
}

/*
This route should not be available in production, but it will not be exclusive 
to the production application until you implement the frontend of the application 
later. So for now, it will remain available to both the development and production 
environments.
*/
// add a XSRF-TOKEN cookie 
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken(); 
    res.cookie("XSRF-TOKEN", csrfToken); 
    res.status(200).json({
        'XSRF-Token': csrfToken
    }); 
}); 













module.exports = router; 