const express = require('express'); 
const router = express.Router(); 

const { Op } = require('sequelize'); 
const { requireAuth } = require('../../utils/auth'); 
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models'); 



/* ----------------------------- Bookings ------------------------------ */


// get Bookings of the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const userBookings = await Booking.findAll({
      where: {
          userId: req.user.id
      },
      raw: true
  });

  for (let i = 0; i < userBookings.length; i++) {
      const booking = userBookings[i];
      const spot = await Spot.findOne({
          where: { id: booking.spotId },
          attributes: {
              exclude: ['description', 'createdAt', 'updatedAt']
          },
          raw: true
      });

      const spotPreviews = await SpotImage.findAll({ where: { spotId: spot.id }, raw: true });
      spotPreviews.forEach(image => {
          if (image.preview === true || image.preview === 1) spot.previewImage = image.url;
      });
      if (!spot.previewImage) spot.previewImage = null;

      booking.Spot = spot;
  }

    res.json({ Bookings: userBookings });
});




// edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {

  const { bookingId } = req.params
  const { user } = req

  const reqStart = req.body.startDate
  const reqEnd = req.body.endDate

  const booking = await Booking.findByPk(bookingId)

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  if (booking.userId !== user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden. This is NOT your booking!!",
      "statusCode": 403
    })
  }

  const today = new Date()

  if (Date.parse(today) > Date.parse(reqEnd)) {
    res.status(403)
    return res.json({
      "message": "Past bookings can't be modified",
      "statusCode": 403
    })
  }

  if (!reqStart || !reqEnd || Date.parse(reqStart) > Date.parse(reqEnd)) {
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
      [Op.or]: [ // booking conflict scenarios
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

  const newBooking = await booking.update({ 
    startDate: reqStart,
    endDate: reqEnd
  })

  return res.json(newBooking)
})



// delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params
  const { user } = req

  const booking = await Booking.findByPk(bookingId, {
    include: { model: Spot } 
  })

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden. You do not have access to this booking",
      "statusCode": 403
    })
  }

  const today = new Date()

  if (Date.parse(today) > Date.parse(booking.startDate)) {
    res.status(403)
    return res.json({
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 403
    })
  }

  await booking.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})





module.exports = router;




