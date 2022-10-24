
const router = require('express').Router(); 








// api test route added to the router 
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body }); 
}); 

/* fetch to test above api route
fetch('/api/test', {
    method: "POST", 
    headers: {
        "Content-Type": "application/json", 
        // xsrf-token cookie => http://localhost:8000/api/csrf/restore 
        // req.csrfToken()
        "XSRF-TOKEN": "NwFHlosM-XXr-IehstGp-mFnUxVeI34KCjx0"
    }, 
    body: JSON.stringify({ test: "success hitting api test route"})
}).then(res => res.json()).then(data => console.log(data)); 
*/





module.exports = router; 

