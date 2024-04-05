
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();


// const validatebookings = [
//     check('startDate')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .isAfter()
//         .withMessage('startDate cannot be in the past'),
//     check('endDate')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .isAfter()
//         .withMessage('endDate cannot be on or before startDate'),
// ]

//GET ALL BOOKINGS OF THE CURRENT USER✅
// ===========================================================
router.get('/current', async (req, res) => {

    /*~ (1)Get the current user's id from the request object~*/
    const currentUserId = req.user.id
    /*~ (2)Make a request to the database to findAll bookings where userId === current user's id ~*/
    const allBookings = await Booking.findAll()
    // console.log(allBookings) //<==it's an array of all bookings
    /*~ (3)Make a request to the the database to findAllSpots ~*/
    const allSpots = await Spot.findAll({ include: SpotImage })//<=== returns an array of all spots
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
                        id: ele.id,
                        ownerId: ele.ownerId,
                        address: ele.address,
                        city: ele.city,
                        state: ele.state,
                        country: ele.country,
                        lat: ele.lat,
                        lng: ele.lng,
                        name: ele.name,
                        price: ele.price,
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

    return res.json(payload)

})



//EDIT A BOOKING
// =====================================================================
router.put('/:bookingId', async (req, res, next) => {
    /*~()get current user from request body~*/
    const currentUserId = req.user.id
    /*~()Get startdate and enddate out of the request body~*/
    const { startDate, endDate } = req.body
    /*~()Get the booking id out of the request body~*/
    const bookingId = parseInt(req.params.bookingId)
    /*~()Make a request to findBookingPk ~*/
    const currentBooking = await Booking.findByPk(bookingId)
    /*~()Handle error if booking does not exist~✅*/
    if (!currentBooking) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Booking with the specified id"
        err.message = "Booking couldn't be found"
        return next(err)
    }
    /*~()if current user does not own booking, do not create booking~✅*/
    if (currentUserId !== currentBooking.userId) {
        return res.json('You are not permitted to make a booking for this spot')
    }
    /*~()If the booking is past the end date, throw an error~✅*/
    const todaysDate = new Date()
    if ((currentBooking.endDate).getTime() < todaysDate.getTime()) {
        const err = new Error
        err.status = 403,
            err.title = "Can't edit a booking that's past the end date"
        err.message = "Past bookings can't be modified"
        return next(err)
    }
    /*~ (3)Make a request to the database to findAll bookings where userId === current user's id ~*/
    const allBookings = await Booking.findAll({ where: { spotId: currentBooking.spotId } })
    /*~()If the booking already has the start or end date that was passed in, throw an error~✅*/
    allBookings.forEach((booking) => {
        if ((booking.startDate).getTime() === new Date(startDate).getTime() || (booking.endDate).getTime() === new Date(endDate).getTime()) {
            const err = new Error
            err.status = 403,
                err.title = "Booking conflict"
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
            err.message = "Sorry, this spot is already booked for the specified dates"
            return next(err)
        }
    })
    /*~()if current user owns booking, update booking~*/
    if (currentUserId === currentBooking.userId) {
        if (startDate !== undefined) { currentBooking.startDate = startDate }
        if (endDate !== undefined) { currentBooking.endDate = endDate }
        await currentBooking.save()
        const editedBooking = currentBooking.toJSON()
        return res.json(editedBooking)
    }
})



// DELETE A BOOKING
// =======================================================
// 📝📝📝📝Looks like when a booking is deleted, the spot is deleted as well
// 📝📝📝📝Revisit the association and work on the delete cascade
router.delete('/:bookingId', async (req, res,next)=>{
    /*~()Get the bookingId out of the request parameter~*/
    const bookingId = parseInt(req.params.bookingId)
     /*~()Get the currentUserId out of the request body~*/
     const currentUserId = req.user.id
     /*~()make a call to findBookingByPK~*/
     const currentBooking = await Booking.findByPk(bookingId)
     /*~()If the booking with that Id does not exist, throw an error~*/
     if (!currentBooking) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Booking with the specified id"
        err.message = "Booking couldn't be found"
        return next(err)
    }
     /*~()Store the verified booking id in a variable~*/
     const isCurrentBookingId = currentBooking.id
     /*~()make a call to findSpotByPk~*/
     const currentSpot = await Spot.findByPk(currentBooking.spotId)
     /*~()Check the booking startDate. If the booking has already started, throw an error~*/
     const bookingStartDate = currentBooking.startDate
     const todaysDate = new Date()
     if(bookingStartDate.getTime() <= todaysDate.getTime()){
        const err = new Error
        err.status = 403
        err.title = "Bookings that have been started can't be deleted"
        err.message = "Bookings that have been started can't be deleted"
        return next(err)
     }
    /*~()compare the bookingId of the currentUser to the userId of the booking~*/
    const isBooker = currentBooking.userId
    /*~()compare the id of the currentUser to the ownerId of the spot that has been booked~*/
    // console.log(isCurrentBookingId)
    const isSpotOwner = currentSpot.ownerId
    /*~()If the booking or spot belongs to the current user, you can go ahead and delete the booking~*/
    if(currentUserId === isBooker || currentUserId === isSpotOwner){
        await currentSpot.destroy()
        return res.json({
            "message": "Successfully deleted"
        })
    } else {
     ///*~()If not, throw an error telling the user that they are not authorized~*/
        return res.json({
            "message": "You are not authorized to perform this action"
        })
    }

})






module.exports = router;
