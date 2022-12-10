
const router = require('express').Router(); 
const sessionRouter = require('./session.js'); 
const usersRouter = require('./users.js'); 
const { restoreUser } = require('../../utils/auth.js'); 
const spotsRouter = require('./spots.js'); 
const spotImagesRouter = require('./spotimages.js'); 
const reviewsRouter = require('./reviews.js'); 
const reviewImagesRouter = require('./reviewimages.js'); 
const bookingsRouter = require('./bookings.js'); 

/* 
    connect restorUser middleware to the API router
    if current user session valid, set req.user to user in db
    if current user session !valid, set req.user to 'null'
*/
router.use(restoreUser);  
router.use('/session', sessionRouter); 
router.use('/users', usersRouter); 
router.use('/spots', spotsRouter); 
router.use('/spot-images', spotImagesRouter); 
router.use('/reviews', reviewsRouter); 
router.use('/review-images', reviewImagesRouter); 
router.use('/bookings', bookingsRouter); 


/* try this in frontend dev tools console to test this POST /api/test test route
window.csrfFetch('/api/test', {
    method: 'POST',
    body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
*/
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


/* test 'setTokenCookie' middleware in auth.js file 
    endpoint: GET /api/set-token-cookie 
*/
const { setTokenCookie } = require('../../utils/auth.js'); 
const { User } = require('../../db/models'); 
router.get('/set-token-cookie', async(_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    }); 
    setTokenCookie(res, user); 
    return res.json({ user }); 
}); 


// check whether or not the req.user key has been populated by the middleware 
router.get('/restore-user', (req, res) => {
    return res.json(req.user)
}); 


/* requireAuth middleware: if there is no session user, route returns error, 
    otherwise returns session user's info
*/
const { requireAuth } = require('../../utils/auth.js'); 
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user); 
}); 





module.exports = router; 

