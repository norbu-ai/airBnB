const express = require('express'); 
const router = express.Router(); 

const { requireAuth } = require('../../utils/auth'); 
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models'); 


// delete a Spot image 
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);
    console.log('spot image: ', spotImage)
    if (spotImage) {
        const spot = await Spot.findByPk(spotImage.toJSON().spotId);
        if (req.user.id === spot.ownerId) {
            await spotImage.destroy();
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        } else res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    } else {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    }
});







module.exports = router; 