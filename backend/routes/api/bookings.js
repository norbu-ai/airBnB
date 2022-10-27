const express = require('express'); 
const router = express.Router(); 

const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models'); 
const { requireAuth } = require('../../utils/auth'); 
const { check } = require('express-validator'); 
const { handleValidationErrors } = require('../../utils/validation')









module.exports = router; 