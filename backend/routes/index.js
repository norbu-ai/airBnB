

const express = require('express'); 
const router = express.Router(); 


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