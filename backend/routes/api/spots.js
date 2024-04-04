const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize, ReviewImage, Booking } = require('../../db/models');
const { Association, fn } = require('sequelize');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })//you should not be using is lenght.Try isfloat instead
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isFloat({ min: 0, max: 5 })//work on this, make min 1
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

//GET ALL SPOTS
router.get('/', async (req, res) => {

    // ========= REFACTOR =============
    // NOTE: this code is close enough to working.
    //revisit the average rating when you are done with the reviews routes
    //to stop sequelize from wrapping the responce in the instance of the model
    // and receive a plain response instead,
    // pass { raw: true } as an option to the finder method🙄.

    const spots = await Spot.findAll()

    const Images = await SpotImage.findAll()

    const allReviews = await Review.findAll()

    const Spots = []

    spots.forEach(async (spot) => {
        //cater for previewimages
        spot = spot.toJSON()
        let images = []
        for (let ele of Images) {
            if (ele.spotId === spot.id) {
                images.push(ele.url)
            }
        }

        spot.previewImage = images

        //cater for rating

        let spotReviews = []
        for (let ele of allReviews) {
            if (ele.spotId === spot.id) {
                spotReviews.push(ele.stars)
            }
        }
        let sum = 0
        spotReviews.forEach((review) => {
            sum += review
        })
        let avgRating = sum / (spotReviews.length)
        spot.avgRating = avgRating
        Spots.push(spot)
    })
    const payload = {
        Spots
    }

    res.json(payload)
})

// //GET ALL SPOTS BY CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this has been tested on one user. It works
    // logout and test on other users
    const userId = req.user.id

    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        }

    })

    const Images = await SpotImage.findAll()

    const allReviews = await Review.findAll()

    const Spots = []

    spots.forEach(async (spot) => {
        //cater for previewimages
        spot = spot.toJSON()
        let images = []
        for (let ele of Images) {
            if (ele.spotId === spot.id) {
                images.push(ele.url)
            }
        }

        spot.previewImage = images

        //cater for rating

        let spotReviews = []
        for (let ele of allReviews) {
            if (ele.spotId === spot.id) {
                spotReviews.push(ele.stars)
            }
        }
        let sum = 0
        spotReviews.forEach((review) => {
            sum += review
        })
        let avgRating = sum / (spotReviews.length)
        spot.avgRating = avgRating
        Spots.push(spot)
    })
    const payload = {
        Spots
    }

    res.json(payload)

})

// //GET DETAILS OF A SPOT BY ID
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.get('/:spotId', async (req, res, next) => {
    // ========= REFACTOR =============
    // It works
    // use either nested:false (in the model) or raw:true as a query option, to get rid of query name
    //come back and see if you can make a single call to the database
    // This approach used lazy loading which produced the results I wanted.
    // Refactor to see if less calls can be made to the database
    const spotId = req.params.spotId

    const verifyId = await Spot.findByPk(spotId)
    //ERROR IF SPOT ID DOES NOT EXIST
    if (!verifyId) {

        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }

    const owner = await User.findOne({
        where: {
            id: verifyId.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })
    const allSpotImages = await SpotImage.findAll({
        where: {
            spotId: verifyId.id
        }
    })
    const allReviews = await Review.findAll({
        where: {
            spotId: verifyId.id
        }
    })
    const numReviews = allReviews.length

    let sum = 0
    allReviews.forEach((review) => {
        sum += review.stars
    })

    const avgStarRating = sum / numReviews

    let payload = {
        id: verifyId.id,
        ownerId: verifyId.ownerId,
        address: verifyId.address,
        city: verifyId.city,
        state: verifyId.state,
        country: verifyId.country,
        lat: verifyId.lat,
        lng: verifyId.lng,
        name: verifyId.name,
        description: verifyId.description,
        price: verifyId.price,
        createdAt: verifyId.createdAt,
        updatedAt: verifyId.updatedAt,
        numReviews,
        avgStarRating,
        SpotImages: allSpotImages,
        Owner: { ...owner.toJSON() },
    }

    res.json(payload)

})

// //CREATE A SPOT
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post('/', [requireAuth, validateSpot], async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this code has (NOT) been tested!!!!
    // You need to redo some validations
    // Modify validations after you're done setting up spots routes
    //check validations for lng, lat and price
    const userId = req.user.id

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.statusCode = 201

    if (!newSpot) {
        return next(err)
    }

    return res.json(newSpot)
})

// //ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this code has (NOT) been tested!!!!
    const Id = req.params.spotId

    const userId = req.user.id
    //verify whether or not the id actually exists
    const verifyId = await Spot.findByPk(Id)

    //ERROR HANDLING (works✅)// find out how to display just the error message
    if (!verifyId) {
        const err = new Error
        err.status = 404
        err.message = "Spot couldn't be found"
        err.title = " Couldn't find a Spot with the specified id"
        return next(err)
    }

    const { url, preview } = req.body

    //AUTHORIZATION (works✅)
    if (verifyId.ownerId === userId) {
        const newImage = await SpotImage.create({
            url,
            preview,
            spotId: parseInt(Id)
        })
        const payload = {
            url: newImage.url,
            preview: newImage.preview
        }
        return res.json(payload)
    } else {
        return res.json('You are not authorized to perform this activity')
    }

})

// //EDIT A SPOT
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this code has (NOT) been tested!!!!

    let spotId = req.params.spotId
    const { address, city, state, country, lat, lng, name, description, price } = req.body


    const userId = req.user.id
    const editedSpot = await Spot.findByPk(spotId)

    //ERROR HANDLING
    if (!editedSpot) {
        const err = new Error
        err.status = 404
        err.message = "Spot couldn't be found"
        err.title = " Couldn't find a Spot with the specified id"
        return next(err)
    }

    //AUTHORIZATION(works to some extent)
    if (parseInt(userId) === editedSpot.ownerId) {
        if (address !== undefined) { editedSpot.address = address }
        if (city !== undefined) { editedSpot.city = city }
        if (state !== undefined) { editedSpot.state = state }
        if (country !== undefined) { editedSpot.country = country }
        if (lat !== undefined) { editedSpot.lat = lat }
        if (lng !== undefined) { editedSpot.lng = lng }
        if (name !== undefined) { editedSpot.name = name }
        if (description !== undefined) { editedSpot.description = description }
        if (price !== undefined) { editedSpot.price = price }
        await editedSpot.save()
    } else {
        return res.json('You are not authorized to perform this activity')
    }
    return res.json(editedSpot)
})

// //DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this code has (NOT) been tested!!!!
    // DELETES the spot but you need to check the get spots route.
    // spots are being created in the database but not all spots are appearing
    // after the request is made ❕❗❗❗//
    const Id = req.params.spotId
    const deletedSpot = await Spot.findByPk(Id)
    const userId = req.user.id


    //ERROR
    if (!deletedSpot) {
        const err = new Error
        err.status = 404
        err.message = "Spot couldn't be found"
        err.title = " Couldn't find a Spot with the specified id"
        return next(err)
    }

    //AUTHORIZATION
    if (deletedSpot.ownerId === userId) {
        await deletedSpot.destroy()
        return res.json({
            "message": "Successfully deleted"
        })
    } else {
        return res.json({
            "message": "You are not authorized to perform this action"
        })
    }

})



//GET ALL REVIEWS BY A SPOT'S ID
router.get('/:spotId/reviews', async (req, res, next) => {
    const Id = req.params.spotId
    const verifyId = await Spot.findByPk(Id)
    //ERROR IF SPOT ID DOES NOT EXIST

    if (!verifyId) {

        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }

    const Reviews = await Review.findAll({
        where: {
            spotId: Id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })





    const payload = {
        Reviews
    }
    res.json(payload)
})


//CREATE A REVIEW FOR A SPOT BASED ON THE SPOT'S ID
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const Id = parseInt(req.params.spotId)
    const currentUserId = req.user.id
    const { review, stars } = req.body
    const verifyId = await Spot.findByPk(Id)
    //ERROR IF SPOT ID DOES NOT EXIST

    if (!verifyId) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }

    const newReview = await Review.create({
        review,
        stars,
        spotId: Id,//doesn't work in development. Returns a string instead
        userId: currentUserId
    })

    // const displayedReview = {}
    // displayedReview.review = newReview.review
    // displayedReview.stars = newReview.stars
    res.statusCode = 201
    res.json(newReview)

    //work on this later
    //Error response: Review from the current user already exists for the Spot
    // only one review can be made by a useron a spot
})





//GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT'S ID✅
// ========================================================================
router.get('/:spotId/bookings', async (req, res, next) => {
    /*~ (1)Get the current user's id from the request object~*/
    const currentUserId = req.user.id
    /*~ (2)Get the spotId from the request object~*/
    const spotId = parseInt(req.params.spotId)
    //*~Find out who owns the spot~*
    const spotExists = await Spot.findByPk(spotId)
    /*~[ERROR HANDLING]~*/
    if (!spotExists) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }
    //console.log(isOwner)<====an object with property ownerId
    /*~ (3)Make a request to the database to findAll bookings where userId === current user's id ~*/
    const allBookings = await Booking.findAll({where:{spotId:spotId}})
    //console.log(allBookings) //<==it's an array of all bookings
    /*~ (4)Make a request to the the database to findUserbyPk ~*/
    const currentUser = await User.findByPk(currentUserId,{attributes:['id', 'firstName', 'lastName']})//<=== returns the current user
    const JCurrentUser = currentUser.toJSON()
    //console.log(currentUser)
    /*~ (5)Define a Bookings array~*/
    const Bookings = []
    /*~ (6)push each booking to the Bookings array~*/
    allBookings.forEach((booking) => {
        /*~(7)Push the booking into Bookings array ~*/
            let jBooking = booking.toJSON()
            /*~[❗❗❗If you are NOT the owner of the spot❗❗❗]~*/
            if(currentUserId !== spotExists.ownerId){
                /*~ (8a)Create a pushedBookings object with the desired attributes~*/
                let pushedBooking ={
                    spotId:jBooking.spotId,
                    startDate:jBooking.startDate,
                    endDate:jBooking.endDate
                }
                /*~(9a)Push into the Bookings object~*/
                Bookings.push(pushedBooking)
            }
            /*~[❗❗❗If you are NOT the owner of the spot❗❗❗]~*/
             /*~[❕❕❕If you ARE the owner of the spot❕❕❕]~*/
             if(currentUserId === spotExists.ownerId){
                /*~ (8b)Create a pushedBookings object with the desired attributes~*/
                let pushedBooking ={
                  User:{...JCurrentUser},
                  ...jBooking
                }
                /*~(9b)Push into the Bookings object~*/
                Bookings.push(pushedBooking)
            }
             /*~[❕❕❕If you ARE the owner of the spot❕❕❕]~*/
    })
    //console.log(Bookings)
    const payload = {
        Bookings
    }

    res.json(payload)

})


module.exports = router;
