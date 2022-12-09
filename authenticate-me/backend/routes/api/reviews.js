const express = require('express'); 
const router = express.Router(); 

const { requireAuth } = require('../../utils/auth'); 
const { validateReview } = require('../../utils/inputValidators'); 
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models'); 



/* ----------------------------- Reviews ------------------------------ */

// get reviews of current user 
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {userId: req.user.id},
        include: [
            {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },{
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: {
                model: SpotImage,
                where: {
                    preview: true
                },
                limit: 1,
                attributes: ['url']
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    });


    for(let i = 0; i < reviews.length; i++){
        const reviewObj = reviews[i].toJSON();
        const previewImgUrlObj = reviewObj.Spot.SpotImages[0];
        if(previewImgUrlObj) reviewObj.Spot.previewImage = previewImgUrlObj.url;
        else reviewObj.Spot.previewImage = null;
        delete reviewObj.Spot.SpotImages;
        reviews[i] = reviewObj;
    }
    return res.json({Reviews: reviews});
});


// edit a review 
router.put('/:reviewId', [requireAuth, validateReview], async(req, res, next) => {
    const userReview = await Review.findByPk(req.params.reviewId); 
    if(userReview) {
        if(userReview.userId === req.user.id){
            const { review, stars } = req.body; 
            if(review && stars){
                userReview.update({
                    review, 
                    stars
                })
                return res.json(userReview)
            }
        } else {
            res.status(403)
            return res.json({
                message: "Unauthorized", 
                statusCode: 403
            })
        }
    } else {
        res.status(404)
        return res.json({
            message: "Review couldn't be found", 
            statusCode: 404
        })
    }
}); 



// delete a Review 
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (review) {
        if (review.userId === req.user.id) {
            await review.destroy();
            return res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        } else res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    } else res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404
    });
});



/* ----------------------------- ReviewImages ------------------------------ */

// create an image for a review by reviewId
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId); 
    if(review){
        if(review.userId === req.user.id){  
            const reviewImages = await ReviewImage.findAll({where: {reviewId: review.id}}); 
            if(reviewImages.length < 10){
                const {url} = req.body; 
                if(url){
                    const newReviewImage = await ReviewImage.create({
                        reviewId: req.params.reviewId, 
                        url
                    }); 
                    // return res.json({
                    //     id: newReviewImage.id, 
                    //     url: newReviewImage.url
                    // })
                    const reviewImageData = {}; 
                    reviewImageData.id = newReviewImage.id; 
                    reviewImageData.url = newReviewImage.url; 
                    res.json(reviewImageData)
                } else {
                    res.status(400)
                    return res.json({
                        message: "url must be provided", 
                        statusCode: 400
                    })
                }
            } else {
                res.status(403)
                return res.json({
                    message: "Maximum number of images for this resource was reached", 
                    statusCode: 403
                })
            }

        } else {
            res.status(403); 
            return res.json({
                message: "Forbidden", 
                statusCode: 403
            })
        }
    } else {
        res.status(404); 
        return res.json({
            message: "Review couldn't be found", 
            statusCode: 404
        })
    }
}); 





module.exports = router; 