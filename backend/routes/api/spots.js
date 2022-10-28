const express = require('express'); 
const router = express.Router(); 

const { requireAuth } = require('../../utils/auth'); 
const { validateSpot, validateReview } = require('../../utils/inputValidators')
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models'); 




// Get all spots 
router.get('/', async(req, res) => {
    const spots = await Spot.findAll(); 
    return res.json({
        Spots: spots
    })
})


// Get all Spots owned by the current owner 
router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id; 
    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        }, 
        raw: true
    })

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];

        const totalReview = await Review.count({ where: { spotId: spot.id } });
        const totalRating = await Review.sum('stars', { where: { spotId: spot.id } });

        if (totalReview > 0 && totalRating > 0) spot.avgRating = totalRating / totalReview
        else spot.avgRating = 0; 

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        if (spotPreviews) {
            spotPreviews.forEach(image => {
                if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
            });
        } else spot.previewImage = null;
    };

    
    return res.json({
        Spots: spots
    })
})


// Get details of a Spot from an id
router.get('/:spotId', async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId); 
    if (spot){
        const spotDetail = spot.toJSON();   // string rep of spot object
        spotDetail.numReviews = await Review.count({ where: { spotId: spot.id }}); 
        const reviewSum = await Review.sum('stars', { where: {spotId: spot.id}}); 
        spotDetail.avgStarRating = reviewSum / spotDetail.numReviews; 
        spotDetail.spotImages = await SpotImage.findAll({
            where: {spotId: spot.id}, 
            attributes: ['id', 'url', 'preview']
        })
        spotDetail.Owner = await User.findByPk(spot.ownerId, {attributes: ['id', 'firstName', 'lastName']})
        return res.json(spotDetail)

    } else {
        res.status(404); 
        return res.json({
            message: "Spot couldn't be found", 
            statusCode: 404
        })
    }
})


// Create a Spot
router.post('/', [requireAuth, validateSpot], async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body; 
    
    if (address && city && state && country && lat && lng && name && description && price){
        const spot = await Spot.create({
            ownerId: req.user.id, 
            address, city, state, country, lat, lng, name, description, price
        })
        res.status(201); 
        return res.json(spot)
    } else {
        let err = {}; 
        err.errors = {}; 
        if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
            err.errors.address = "Street address is required"; 
            err.errors.city = "City is required";
            err.errors.state =  "State is required";
            err.errors.country = "Country is required";
            err.errors.lat = "Latitude is not valid";
            err.errors.lng = "Longitude is not valid";
            err.errors.name = "Name must be less than 50 characters";
            err.errors.description = "Description is required";
            err.errors.price = "Price per day is required";
        }
        err.title = 'Validation Error', 
        err.message = 'Validation Error', 
        err.status = 400; 
        return next(err)
    }
})


// edit a Spot by its id 
router.put('/:spotId', [requireAuth, validateSpot], async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId); 
    const { address, city, state, country, lat, lng, name, description, price } = req.body; 
   
    if (spot){
        if(spot.ownerId === req.user.id){
            if (address && city && state && country && lat && lng && name && description && price){
                spot.address = address; 
                spot.city = city; 
                spot.state = state; 
                spot.country = country; 
                spot.lat = lat; 
                spot.lng = lng; 
                spot.name = name; 
                spot.description = description; 
                spot.price = price

                await spot.save(); 
                return res.json(spot)
            }
        } else {
            const err = new Error("Unauthorized"); 
            err.title = "Unauthorized"; 
            err.errors = ["Unauthorized"]; 
            err.status = 401; 
            return next(err); 
        }
    } else {
        res.status(404); 
        return res.json({
            message: "Spot couldn't be found", 
            statusCode: 404
        })
    }
})


// create an image for a spot by its spotId 
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)     // ? parseInt(req.params.spotId)
    const { url, preview } = req.body; 

    if (spot) {
        if (spot.toJSON().ownerId === req.user.id){
            if (url && (preview === true || preview === false)){
                const spotImage = await SpotImage.create({
                    spotId: req.params.spotId,      // might need parseInt
                    url, 
                    preview
                }); 

                const returnImage = await SpotImage.findByPk(spotImage.id, {
                    attributes: ['id', 'url', 'preview']
                })
                return res.json(returnImage)
            } else {
                res.status(400)
                return res.json({
                    message: "url and preview values are required", 
                    statusCode: 400
                })
            }
        } else { 
            const err = new Error("Unauthorized"); 
            err.title = "Unauthorized"; 
            err.errors = ['Unauthorized']
            err.status = 403
            return next(err)
        }
    } else {   
        res.status(404)
        return res.json({
            message: "Spot couldn't be found", 
            statusCode: 404
        })
    }
})


// delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(parseInt(req.params.spotId));
    if (spot) {
        if (spot.ownerId === req.user.id) {
            await spot.destroy();
            return res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        } else {
            let err = {}
            err.title = "Authorization Error";
            err.message = "Forbidden";
            err.status = 403;
            return next(err);
        }
    } else {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});



// Get all reviews by a Spot's id 
router.get('/:spotId/reviews', async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId); 
    if (spot){
        const spotReviews = await Review.findAll({where: {spotId: req.params.spotId}, raw: true}); 
        for (let i = 0; i < spotReviews.length; i++){
            const review = spotReviews[i]; 
            const user = await User.findOne({where: {id: review.userId}, attributes: ['id', 'firstName', 'lastName'], raw:true}); 
            const reviewImages = await ReviewImage.findAll({where: {reviewId: review.id}, attributes: ['id', 'url']}); 
            review.User = user; 
            review.ReviewImages = reviewImages; 
        }; 
            return res.json({
                Reviews: spotReviews
        })
    } else {
        res.status(404); 
        return res.json({
            message: "Spot couldn't be found", 
            statusCode: 404
        })
    }
})


// create a review for a Spot by its id
router.post('/:spotId/reviews', [requireAuth, validateReview], async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId); 
    if (!spot) {
        res.status(404); 
        return res.json({
            message: "Spot couldn't be found", 
            statusCode: 404
        })
    } 
        const spotReview = await Review.findOne({where: {spotId: req.params.spotId}, raw: true}); 
            if (spotReview){
                if(spotReview.userId === req.user.id) {
                    res.status(403)
                    return res.json({
                        message: "User already has a review for this spot", 
                        statusCode: 403
                    }); 
                }
            }

        const { review, stars } = req.body; 
        if (review && stars) {
            const newReview = await Review.create({
                spotId: req.params.spotId, 
                userId: req.user.id, 
                review, 
                stars
            })
            res.status(201)
            return res.json(newReview)
        }
})












module.exports = router; 