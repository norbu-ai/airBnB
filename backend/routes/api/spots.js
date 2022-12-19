const express = require('express'); 
const router = express.Router(); 

const { requireAuth } = require('../../utils/auth'); 
const { Op } = require('sequelize'); 
const { validateSpot, validateReview, validatePagination } = require('../../utils/inputValidators')
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models'); 



/* ----------------------------- Spots ------------------------------ */

// get all Spots 
router.get("/", validatePagination, async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query; 

    let pagination = {}
    page = parseInt(page)
    size = parseInt(size)

    if (!page || isNaN(page)) page = 1
    if (!size || isNaN(size)) size = 20

    pagination.limit = size
    pagination.offset = size * (page - 1)

    let where = {}

    minLat = parseFloat(minLat)
    maxLat = parseFloat(maxLat)
    minLng = parseFloat(minLng)
    maxLng = parseFloat(maxLng)
    minPrice = parseFloat(minPrice)
    maxPrice = parseFloat(maxPrice)

    if (minLat) where.lat = { [Op.gte]: minLat }
    if (maxLat) where.lat = { [Op.lte]: maxLat }
    if (minLng) where.lng = { [Op.gte]: minLng }
    if (maxLng) where.lng = { [Op.lte]: maxLng }
    if (minPrice) where.price = { [Op.gte]: minPrice }
    if (maxPrice) where.price = { [Op.lte]: maxPrice }

    const allSpots = await Spot.findAll({
        where,
        ...pagination
    })

    let spots = []
    // lazy loading (N + 1)
    for (let i = 0; i < allSpots.length; i++) {
        const spotObj = allSpots[i].toJSON()
        const rating = await Review.findAll({
        where: { spotId: spotObj.id },
        attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]]
    })

    spotObj.avgRating = Number(parseFloat(rating[0].toJSON().avgRating).toFixed(1))

    const image = await SpotImage.findAll({
        where: {
            [Op.and]: [
            { spotId: spotObj.id },
            { preview: true }
        ]},
        attributes: ["url"]
    })

    if (!image.length) {
        spotObj.previewImage = "no image"
    } else {
        spotObj.previewImage = image[0].url 
    }

    spots.push(spotObj)
    }

    return res.json({
        Spots: spots,
        page,
        size
    })
})



// get Spots owned by the current owner 
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

        if (totalReview > 0 && totalRating > 0) {
            spot.avgRating = totalRating / totalReview; 
        } else {
            spot.avgRating = 0; 
        }

        const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
        if (spotPreviews) {
            spotPreviews.forEach(image => {
                if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
            });
        } else {
            spot.previewImage = null;
        }
    };
    return res.json({
        Spots: spots
    })
})


// get details of a Spot from a spotId
router.get('/:spotId', async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId); 
    if (spot){
        const spotDetail = spot.toJSON();  
        spotDetail.numReviews = await Review.count({ where: { spotId: spot.id }}); 
        const reviewSum = await Review.sum('stars', { where: {spotId: spot.id}}); 
        spotDetail.avgStarRating = reviewSum / spotDetail.numReviews; 
        spotDetail.SpotImages = await SpotImage.findAll({
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


// create a Spot
router.post('/', requireAuth, validateSpot, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body; 
    if (address && city && state && country && lat && lng && name && description && price){
        const spot = await Spot.create({
            ownerId: req.user.id, 
            address, 
            city, 
            state, 
            country, 
            lat: parseFloat(lat),  
            lng: parseFloat(lng), 
            name, 
            description, 
            price: parseFloat(price)
        })
        res.status(201); 
        return res.json(spot)
    } 
})


// edit a Spot by its spotId 
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
}); 


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



/* ----------------------------- SpotImages ------------------------------ */

// create a SpotImage for a Spot using its spotId
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)     
    const { url, preview } = req.body; 

    if (spot) {
        if (spot.toJSON().ownerId === req.user.id){
            if (url && (preview === true || preview === false)){
                const spotImage = await SpotImage.create({
                    spotId: req.params.spotId,      
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




/* ----------------------------- Reviews ------------------------------ */

// get all Reviews of a Spot by its spotId
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


// create a Review for a Spot by its spotId
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
}); 



/* ----------------------------- Bookings ------------------------------ */

// get all Bookings for a Spot using its spotId
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { user } = req

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spot.ownerId !== user.id) {
        const notOwnerBooking = await Booking.findAll({
            attributes: ["spotId", "startDate", "endDate"],
            where: {
                spotId: spot.id,
                userId: user.id
            }
        })
        return res.json({ Bookings: notOwnerBooking })

    } else {
        const ownerBookings = await Booking.findAll({
            where: {
                spotId: spotId,
            },
            include: {
                model: User,
                attributes: ["id", "firstName", "lastName"],
            }
        })
        return res.json({ Bookings: ownerBookings })
    }
})


// create a Booking of a Spot using Spot's spotId
router.post("/:spotId/bookings", [requireAuth], async (req, res) => {
    const { spotId } = req.params
    const { user } = req

    const reqStart = req.body.startDate
    const reqEnd = req.body.endDate

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spot.ownerId === user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden. You shouldn't book your own spot!!",
            "statusCode": 403
        })
    }

    const today = new Date()

    if (!reqStart || !reqEnd ||
        Date.parse(reqStart) > Date.parse(reqEnd) ||
        Date.parse(today) > Date.parse(reqStart)) {

        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const conflictBooking = await Booking.findOne({
        where: {
            spotId,
            [Op.or]: [ // all booking conflict scenarios 
                { startDate: { [Op.between]: [reqStart, reqEnd] } },
                { endDate: { [Op.between]: [reqStart, reqEnd] } },
                {
                    startDate: { [Op.lte]: reqStart },
                    endDate: { [Op.gte]: reqEnd }
                },
                {
                    startDate: { [Op.gte]: reqStart },
                    endDate: { [Op.lte]: reqEnd }
                }
            ]
        }
    })

    if (conflictBooking) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
            }
        })
    }

    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: user.id,
        startDate: reqStart,
        endDate: reqEnd
    })

    return res.json(newBooking)
})




module.exports = router; 









