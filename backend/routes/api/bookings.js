
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();


const validateSignup = [
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('startDate cannot be in the past'),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('endDate cannot be on or before startDate'),
]

//GET ALL BOOKINGS OF THE CURRENT USER
// ===========================================================
router.get('/current', async (req, res) => {

    /*~ (1)Get the current user's id from the request object~*/
    const currentUserId = req.user.id
    /*~ (2)Make a request to the database to findAll bookings where userId === current user's id ~*/
    const allBookings = await Booking.findAll()
    // console.log(allBookings) //<==it's an array of all bookings
    /*~ (3)Make a request to the the database to findAllSpots ~*/
    const allSpots = await Spot.findAll({include: SpotImage})//<=== returns an array of all spots
    /*~ (4)Define a Bookings array~*/
    const Bookings = []
    /*~ (5)For each booking, go through the spots array to identify the spot that has the same id as booking.spotId~*/
    allBookings.forEach((booking) => {
        /*~(6)Push the booking into Bookings array ~*/
        if (booking.userId === currentUserId) {
            let jBooking = booking.toJSON()
            /*~ (7)Iterate through allSpots to find the spot that has been booked~*/
            for (let ele of allSpots) {
                if (ele.id === jBooking.spotId) {
                    //console.log(ele.toJSON())
                    ele = ele.toJSON()
                    const Spot = {
                        id:ele.id,
                        ownerId:ele.ownerId,
                        address:ele.address,
                        city:ele.city,
                        state:ele.state,
                        country:ele.country,
                        lat:ele.lat,
                        lng:ele.lng,
                        name:ele.name,
                        price:ele.price,
                        previewImage: ele.SpotImages[0].url
                    }
                    //console.log(Spot)
                    jBooking.Spot = Spot
                }
            }
            Bookings.push(jBooking)
        }
    })
    //console.log(Bookings)
    const payload = {
        Bookings
    }

    res.json(payload)

})
















module.exports = router;
