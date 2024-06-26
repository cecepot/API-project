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
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })//you should not be using is lenght.Try isfloat instead
        .withMessage('Latitude must be within -90 and 90')
        .notEmpty()
        .withMessage('Latitude is required'),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be within -180 and 180')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required'),
    check('name')
        .isLength({ max: 50 })  //made changes here
        .withMessage('Name must be less than 50 characters')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('description')
        .isLength({ min: 30 })
        .withMessage('Description must be at least 30 characters')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .isFloat({ min: 1 })
        .withMessage('Price per day must be a positive number')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Price is required'),
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

// const validateBookings = [
//     check('startDate')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage('startDate cannot be in the past'),
//     check('endDate')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage('endDate cannot be on or before startDate'),
// ];





//GET ALL SPOTS
// =======================================
// 📝📝📝📝Everything but average works fine in production
router.get('/', async (req, res, next) => {
    /*~()Get the page and size from the request's query parameters~*/
    let { page, size } = req.query;
    /*~()Set default values for the page and size variables~*/
    if (!page) page = 1;
    if (!size) size = 20;

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {};

    if (page > 10) { page = 10 }
    if (size > 20) { size = 20 }

    if (page > 0 && size > 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }
    else if (size <= 0 && page <= 0) {
        const err = new Error
        err.errors = {
            size: "Size must be greater than or equal to 1",
            page: "Page must be greater than or equal to 1"
        }
        err.title = 'Query parameter validation errors'
        err.status = 400
        err.message = "Bad Request"
        return next(err)
    }
    else if (page <= 0) {
        const err = new Error
        err.errors = { page: "Page must be greater than or equal to 1" }
        err.title = 'Query parameter validation errors'
        err.status = 400
        err.message = "Bad Request"
        return next(err)
    }
    else if (size <= 0) {
        const err = new Error
        err.errors = { size: "Size must be greater than or equal to 1" }
        err.title = 'Query parameter validation errors'
        err.status = 400
        err.message = "Bad Request"
        return next(err)
    }

    // } else if (page <= 0) {
    //     const err = new Error
    //     err.status = 400
    //     err.message = "Bad Request"
    //     err.errors = { page: "Page must be greater than or equal to 1" }
    //     return next(err)
    // } else if (size <= 0) {
    //     const err = new Error
    //     err.status = 400
    //     err.message = "Bad Request"
    //     err.errors = { page: "Size must be greater than or equal to 1" }
    //     return next(err)
    // }
    /*~()Make a call to the database to get all spots~*/
    const spots = await Spot.findAll({ ...pagination })
    /*~()Make a call to the database to get all spotImages~*/
    const Images = await SpotImage.findAll()
    /*~()Make a call to the database to get all reviews~*/
    const allReviews = await Review.findAll()
    /*~()Create a Spots array which serves as a payload~*/
    const Spots = []
    /*~()Iterate over each spot ~*/
    spots.forEach((spot) => {
        /*~()Make the spot readable by converting it to JSON to get rid of all unwanted data ~*/
        spot = spot.toJSON()
        /*~()Formatting price to return as a number~*/
        spot.price = parseInt(spot.price)
        /*~()Formatting date to return without extra elements~*/
        let createdAt = spot.createdAt.toISOString().split('T')[0]
        let updatedAt = spot.updatedAt.toISOString().split('T')[0]
        let createdAtTime = spot.createdAt.toISOString().split('T')[1].split('.')[0]
        let updatedAtTime = spot.updatedAt.toISOString().split('T')[1].split('.')[0]
        spot.createdAt = createdAt.concat(' ', createdAtTime)
        spot.updatedAt = updatedAt.concat(' ', updatedAtTime)
        /*~()Create an array to hold all the current spots's images ~*/
        let images = []
        /*~()Iterate over each image in spotImages(images of all spot in the entire database)~*/
        for (let ele of Images) {
            if (ele.spotId === spot.id) {
                images.push(ele.url)/*~()If the current image belongs to the current spot,
                 push the image into the images array. This selects only the images that belong to the
                 spot in question~*/
            }
        }
        /*~()Create a previewImage property for the current spot which will be the first image of the spot ~*/
        spot.previewImage = images[0]
        /*~()Create an array to hold all the current spots's reviews ~*/
        let spotReviews = []
        /*~()Iterate over each review in spotReviews(reviews of all spot in the entire database)~*/
        for (let ele of allReviews) {
            ele = ele.toJSON()
            if (ele.spotId === spot.id) {
                spotReviews.push(ele)
            }/*~()If the current review belongs to the current spot,
                 push the review into the reviews array. This selects only the reviews that belong to the
                 spot in question~*/
        }
        /*~()Find the average rating for the spot~*/
        let sum = 0
        spotReviews.forEach((review) => {
            /*~()Formatting stars to return as a number~*/
            review.stars = parseInt(review.stars)
            sum += review.stars
        })
        let avgRating = sum / (spotReviews.length)
        /*~()Create an averagerating property for the current spot~*/
        spot.avgRating = avgRating
        /*~()Push each spot object into the spots's array ~*/
        Spots.push(spot)
    })
    /*~()Create a payload which will hold the Spots array~*/
    const payload = {
        Spots,
        page,
        size
    }
    /*~()Return the payload as the response body~*/
    return res.json(payload)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// //GET ALL SPOTS BY CURRENT USER
//=================================================
// 📝📝📝📝Everything but average works fine in production
router.get('/current', requireAuth, async (req, res, next) => {
    /*~()Get the current user's id~*/
    const userId = req.user.id
    /*~()Make a call to the database to get all spots which belong to the current user~*/
    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        }
    })
    /*~()Make a call to the database to get all spotImages for the current spot~*/
    const Images = await SpotImage.findAll()
    /*~()Make a call to the database to get all spotReviews for the current spot~*/
    const allReviews = await Review.findAll()
    /*~()Create a Spots array which serves as a payload~*/
    const Spots = []
    /*~()Iterate over each spot ~*/
    spots.forEach((spot) => {
        /*~()Make the spot readable by converting it to JSON to get rid of all unwanted data ~*/
        spot = spot.toJSON()
        /*~()Formatting price to return as a number~*/
        spot.price = parseInt(spot.price)
        /*~()Formatting date to return without extra elements~*/
        let createdAt = spot.createdAt.toISOString().split('T')[0]
        let updatedAt = spot.updatedAt.toISOString().split('T')[0]
        let createdAtTime = spot.createdAt.toISOString().split('T')[1].split('.')[0]
        let updatedAtTime = spot.updatedAt.toISOString().split('T')[1].split('.')[0]
        spot.createdAt = createdAt.concat(' ', createdAtTime)
        spot.updatedAt = updatedAt.concat(' ', updatedAtTime)
        /*~()Create an array to hold all the current spots's images ~*/
        let images = []
        /*~()Iterate over each image in spotImages(images of all spot in the entire database)~*/
        for (let ele of Images) {
            if (ele.spotId === spot.id) {
                images.push(ele.url)/*~()If the current image belongs to the current spot,
                  push the image into the images array. This selects only the images that belong to the
                  spot in question~*/
            }
        }
        /*~()Create a previewImage property for the current spot which will be the first image of the spot ~*/
        spot.previewImage = images[0]
        /*~()Create an array to hold all the current spots's reviews ~*/
        let spotReviews = []
        /*~()Iterate over each review in spotReviews(reviews of all spot in the entire database)~*/
        for (let ele of allReviews) {
            ele = ele.toJSON()
            if (ele.spotId === spot.id) {
                spotReviews.push(ele)
            }/*~()If the current review belongs to the current spot,
                  push the review into the reviews array. This selects only the reviews that belong to the
                  spot in question~*/
        }
        /*~()Find the average rating for the spot~*/
        let sum = 0
        spotReviews.forEach((review) => {
            /*~()Formatting stars to return as a number~*/
            review.stars = parseInt(review.stars)
            sum += review.stars
        })
        let avgRating = sum / (spotReviews.length)
        /*~()Create an averagerating property for the current spot~*/
        spot.avgRating = avgRating
        /*~()Push each spot object into the spots's array ~*/
        Spots.push(spot)
    })
    /*~()Create a payload which will hold the Spots array~*/
    const payload = {
        Spots
    }
    /*~()Return the payload as the response body~*/
    return res.json(payload)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// //GET DETAILS OF A SPOT BY ID
//======================================================================================
router.get('/:spotId', async (req, res, next) => {
    // 📝📝📝📝Everything but average works fine in production
    /*~()Get spot id from req body~*/
    const spotId = req.params.spotId
    /*~()Ensure that the spot exists~*/
    const verifyId = await Spot.findByPk(spotId)
    /*~()throw an error if the spot does NOT exist~*/
    if (!verifyId) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }
    /*~()Get the spot owner's details~*/
    const owner = await User.findOne({
        where: {
            id: verifyId.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })
    /*~()Get all the images for the spot in question~*/
    const allSpotImages = await SpotImage.findAll({
        where: {
            spotId: verifyId.id
        },
        attributes: ['id', 'url', 'preview']
    })
    /*~()Get all the reviews for the spot in question~*/
    const allReviews = await Review.findAll({
        where: {
            spotId: verifyId.id
        }
    })
    /*~()Store the numbere of reviews in a variable~*/
    const numReviews = allReviews.length
    /*~()Find the average rating of the spot~*/
    let sum = 0
    allReviews.forEach((review) => {
        /*~()Formatting stars to return as a number~*/
        review.stars = parseInt(review.stars)
        sum += review.stars
    })
    /*~()Store the average rating in a variable~*/
    const avgStarRating = sum / numReviews
    const jverifyId = verifyId.toJSON()
    /*~()Formatting price to return as a number~*/
    jverifyId.price = parseInt(verifyId.price)
    /*~()Formatting date to return without extra elements~*/
    let createdAt = jverifyId.createdAt.toISOString().split('T')[0]
    let updatedAt = jverifyId.updatedAt.toISOString().split('T')[0]
    let createdAtTime = jverifyId.createdAt.toISOString().split('T')[1].split('.')[0]
    let updatedAtTime = jverifyId.updatedAt.toISOString().split('T')[1].split('.')[0]
    jverifyId.createdAt = createdAt.concat(' ', createdAtTime)
    jverifyId.updatedAt = updatedAt.concat(' ', updatedAtTime)
    /*~()Create a payload to be sent to the user~*/
    let payload = {
        id: jverifyId.id,
        ownerId: jverifyId.ownerId,
        address: jverifyId.address,
        city: jverifyId.city,
        state: jverifyId.state,
        country: jverifyId.country,
        lat: jverifyId.lat,
        lng: jverifyId.lng,
        name: jverifyId.name,
        description: jverifyId.description,
        price: jverifyId.price,
        createdAt: jverifyId.createdAt,
        updatedAt: jverifyId.updatedAt,
        numReviews,
        avgStarRating,
        SpotImages: allSpotImages,
        Owner: { ...owner.toJSON() },
    }
    /*~()Send the payload as the response to the user~*/
    return res.json(payload)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




// //CREATE A SPOT✅
// =======================================================================================
router.post('/', [requireAuth, validateSpot], async (req, res, next) => {
    /*~()Get the current user's id~*/
    const userId = req.user.id
    /*~()Pull all the info needed to create a spot out of the request body~*/
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    /*~()Validate the details and create the spot~*/
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
    /*~()Change the statusCode to 201 created~*/
    res.statusCode = 201
    /*~()If the spot could not be created, let the user know why~*/
    if (!newSpot) {
        return next(err)
    }
    let jNewSpot = newSpot.toJSON()
    /*~()Formatting price to return as a number~*/
    jNewSpot.price = parseInt(newSpot.price)
    /*~()Formatting date to return without extra elements~*/
    let createdAt = jNewSpot.createdAt.toISOString().split('T')[0]
    let updatedAt = jNewSpot.updatedAt.toISOString().split('T')[0]
    let createdAtTime = jNewSpot.createdAt.toISOString().split('T')[1].split('.')[0]
    let updatedAtTime = jNewSpot.updatedAt.toISOString().split('T')[1].split('.')[0]
    jNewSpot.createdAt = createdAt.concat(' ', createdAtTime)
    jNewSpot.updatedAt = updatedAt.concat(' ', updatedAtTime)
    /*~()If the spot was created, return the newly created spot to the user~*/
    return res.json(jNewSpot)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// //ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID✅
// =============================================================================
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    /*~()Get spot id out of the request body~*/
    const Id = parseInt(req.params.spotId)
    /*~()Get user id out of the request body~*/
    const userId = req.user.id
    /*~()verify whether or not the id actually exists~*/
    const verifyId = await Spot.findByPk(Id)
    /*~()if the spot does not exist, throw an error~*/
    if (!verifyId) {
        const err = new Error
        err.status = 404
        err.message = "Spot couldn't be found"
        err.title = " Couldn't find a Spot with the specified id"
        return next(err)
    }
    /*~()Get the image details out of the request body~*/
    const { url, preview } = req.body
    /*~()If user is the owner of the spot, create the image~*/
    if (verifyId.ownerId === userId) {
        const newImage = await SpotImage.create({
            url,
            preview,
            spotId: parseInt(Id)
        })
        /*~()Create a payload to send back to the user~*/
        const payload = {
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview
        }
        /*~()send the payload to the user~*/
        return res.json(payload)
    } else {
        /*~()If the user is not authorized to perform the action, throw an error~*/
        const err = new Error
        err.status = 403
        err.title = "unauthorized"
        err.message = "You are not authorized to perform this action"
        return next(err)
    }

})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// //EDIT A SPOT✅
// =========================================================================================
router.put('/:spotId', [requireAuth, validateSpot], async (req, res, next) => {
    /*~()~*/
    let spotId = req.params.spotId
    /*~()~*/
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    /*~()~*/
    const userId = req.user.id
    /*~()~*/
    const editedSpot = await Spot.findByPk(spotId)
    //ERROR HANDLING
    if (!editedSpot) {
        const err = new Error
        err.status = 404
        err.message = "Spot couldn't be found"
        err.title = " Couldn't find a Spot with the specified id"
        return next(err)
    }
    //AUTHORIZATION
    if (userId === editedSpot.ownerId) {
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
        const err = new Error
        err.status = 403
        err.title = "unauthorized"
        err.message = "You are not authorized to perform this action"
        return next(err)
    }
    const jEditedSpot = editedSpot.toJSON()
    /*~()Formatting date to return without extra elements~*/
    let createdAt = jEditedSpot.createdAt.toISOString().split('T')[0]
    let updatedAt = jEditedSpot.updatedAt.toISOString().split('T')[0]
    let createdAtTime = jEditedSpot.createdAt.toISOString().split('T')[1].split('.')[0]
    let updatedAtTime = jEditedSpot.updatedAt.toISOString().split('T')[1].split('.')[0]
    jEditedSpot.createdAt = createdAt.concat(' ', createdAtTime)
    jEditedSpot.updatedAt = updatedAt.concat(' ', updatedAtTime)
    return res.json(jEditedSpot)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





// //DELETE A SPOT✅
// ===================================================================
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    /*~()~*/
    const Id = req.params.spotId
    /*~()~*/
    const deletedSpot = await Spot.findByPk(Id)
    /*~()~*/
    const userId = req.user.id
    /*~()~*/
    //ERROR
    if (!deletedSpot) {
        const err = new Error
        err.status = 404
        err.message = "Spot couldn't be found"
        err.title = " Couldn't find a Spot with the specified id"
        return next(err)
    }
    /*~()~*/
    //AUTHORIZATION
    if (deletedSpot.ownerId === userId) {
        await deletedSpot.destroy()
        return res.json({
            "message": "Successfully deleted"
        })
    } else {
        const err = new Error
        err.status = 403
        err.title = "unauthorized"
        err.message = "You are not authorized to perform this action"
        return next(err)
    }
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//GET ALL REVIEWS BY A SPOT'S ID✅
// ===================================================================
router.get('/:spotId/reviews', async (req, res, next) => {
    /*~()~*/
    const Id = req.params.spotId
    /*~()~*/
    const verifyId = await Spot.findByPk(Id)
    //ERROR IF SPOT ID DOES NOT EXIST
    if (!verifyId) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }
    /*~()~*/
    const reviews = await Review.findAll({
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
    let Reviews = []
    reviews.forEach((review) => {
        const Rev = review.toJSON()
        /*~()Formatting date to return without extra elements~*/
        let createdAt = Rev.createdAt.toISOString().split('T')[0]
        let updatedAt = Rev.updatedAt.toISOString().split('T')[0]
        let createdAtTime = Rev.createdAt.toISOString().split('T')[1].split('.')[0]
        let updatedAtTime = Rev.updatedAt.toISOString().split('T')[1].split('.')[0]
        Rev.createdAt = createdAt.concat(' ', createdAtTime)
        Rev.updatedAt = updatedAt.concat(' ', updatedAtTime)
        Reviews.push(Rev)
    })
    /*~()~*/
    const payload = {
        Reviews
    }
    /*~()~*/
    return res.json(payload)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ***📝📝📝📝work on the reviews model. stars should be an integer from 1 to 5❗
//CREATE A REVIEW FOR A SPOT BASED ON THE SPOT'S ID✅
// =============================================================================================
// 📝📝📝📝Yet to be tested in production
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res, next) => {
    /*~()~*/
    const Id = parseInt(req.params.spotId)
    /*~()~*/
    const currentUserId = req.user.id
    /*~()~*/
    const { review, stars } = req.body
    /*~()~*/
    const verifyId = await Spot.findByPk(Id)
    //ERROR IF SPOT ID DOES NOT EXIST
    if (!verifyId) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }
    /*~()Check if the current user already has a review for the spot~*/
    /*~()Find all reviews where spotid is the current spot's id~*/
    const allSpotReviews = await Review.findAll({ where: { spotId: verifyId.id } })
    /*~()Go through the reviews array. Check each review. if review.userid === current user's id, throw an error~*/
    let hasReview = false
    allSpotReviews.forEach((review) => {
        if (review.userId === currentUserId) {
            hasReview = true
        }
    })
    if (hasReview === true) {
        const err = new Error
        err.status = 500
        err.title = "Review from the current user already exists for the Spot"
        err.message = "User already has a review for this spot"
        return next(err)
    } else {
        /*~()Else create a new review~*/
        const newReview = await Review.create({
            review,
            stars,
            spotId: Id,
            userId: currentUserId
        })
        /*~()~*/
        res.statusCode = 201
        /*~()Formatting date to return without extra elements~*/
        const jReview = newReview.toJSON()
        let createdAt = jReview.createdAt.toISOString().split('T')[0]
        let updatedAt = jReview.updatedAt.toISOString().split('T')[0]
        let createdAtTime = jReview.createdAt.toISOString().split('T')[1].split('.')[0]
        let updatedAtTime = jReview.updatedAt.toISOString().split('T')[1].split('.')[0]
        jReview.createdAt = createdAt.concat(' ', createdAtTime)
        jReview.updatedAt = updatedAt.concat(' ', updatedAtTime)
        return res.json(jReview)
    }
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





//GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT'S ID✅
// ========================================================================
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
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
    const allUsers = await User.findAll({ attributes: ['id', 'firstName', 'lastName'] })
    /*~ (3)Make a request to the database to findAll bookings where userId === current user's id ~*/
    const allBookings = await Booking.findAll({ where: { spotId: spotId } })
    /*~ (4)Make a request to the the database to findUserbyPk ~*/
    const currentUser = await User.findByPk(currentUserId, { attributes: ['id', 'firstName', 'lastName'] })//<=== returns the current user
    const JCurrentUser = currentUser.toJSON()
    /*~ (5)Define a Bookings array~*/
    const Bookings = []
    /*~ (6)push each booking to the Bookings array~*/
    allBookings.forEach((booking) => {
        /*~(7)Push the booking into Bookings array ~*/
        let jBooking = booking.toJSON()
        //FORMAT THE DATE
        jBooking.startDate = jBooking.startDate.toISOString().split('T')[0]
        jBooking.endDate = jBooking.endDate.toISOString().split('T')[0]
        /*~[❗❗❗If you are NOT the owner of the spot❗❗❗]~*/
        if (currentUserId !== spotExists.ownerId) {
            /*~ (8a)Create a pushedBookings object with the desired attributes~*/
            let pushedBooking = {
                spotId: jBooking.spotId,
                startDate: jBooking.startDate,
                endDate: jBooking.endDate
            }
            /*~(9a)Push into the Bookings object~*/
            Bookings.push(pushedBooking)
        }
        /*~[❕❕❕If you ARE the owner of the spot❕❕❕]~*/
        if (currentUserId === spotExists.ownerId) {
            // const booker = booking.userId
            // const bookerDetails = await User.findByPk(bookerDetails)
            /*~()Formatting date to return without extra elements~*/
            let createdAt = jBooking.createdAt.toISOString().split('T')[0]
            let updatedAt = jBooking.updatedAt.toISOString().split('T')[0]
            let createdAtTime = jBooking.createdAt.toISOString().split('T')[1].split('.')[0]
            let updatedAtTime = jBooking.updatedAt.toISOString().split('T')[1].split('.')[0]
            jBooking.createdAt = createdAt.concat(' ', createdAtTime)
            jBooking.updatedAt = updatedAt.concat(' ', updatedAtTime)
            /*~ (8b)Create a pushedBookings object with the desired attributes~*/
            let booker
            allUsers.forEach((user) => {
                user = user.toJSON()
                if (user.id === jBooking.userId) {
                    booker = user
                }
            })
            let pushedBooking = {
                User: { ...booker },
                ...jBooking
            }
            /*~(9b)Push into the Bookings object~*/
            Bookings.push(pushedBooking)
        }
        /*~[❕❕❕If you ARE the owner of the spot❕❕❕]~*/
    })
    const payload = {
        Bookings
    }

    res.json(payload)
})



//CREATE A BOOKING FROM A SPOT BASED ON THE SPOT'S ID
// =====================================================
//📝📝You forgot to add constraint where startdate can't be in the past
//📝📝or enddate is before or the same day as startdate
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    /*~()get current user from request body~*/
    const currentUserId = req.user.id
    /*~()Get the booking column names out of the request body~*/
    let { startDate, endDate } = req.body
    /*~()Get spotId out of request body~*/
    const spotId = parseInt(req.params.spotId)
    /*~()Get all bookings for the spot~*/
    const allSpotBookings = await Booking.findAll({ where: { spotId: spotId } })
    /*~()Make a request to findspotByPk ~*/
    const currentSpot = await Spot.findByPk(spotId)
    /*~()Handle error if spot does not exist~✅*/
    if (!currentSpot) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }
    /*~()If startDate is in the past or endDate is before startDate~*/
    const todaysDate = new Date()
    if (new Date(startDate).getTime() < todaysDate.getTime()) {
        const err = new Error
        err.status = 400
        err.title = "Body validation errors"
        err.message = "startDate cannot be in the past"
        return next(err)
    }
    if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
        const err = new Error
        err.status = 400
        err.title = "Body validation errors"
        err.message = "endDate cannot be on or before startDate"
        return next(err)
    }
    /*~()if current user owns spot, do not create booking~✅*/
    if (currentUserId === currentSpot.ownerId) {
        const err = new Error
        err.status = 403
        err.title = "unauthorized"
        err.message = "You are not authorized to perform this action"
        return next(err)
    }
    /*~()if current user does not own spot, create booking~*/
    let noIssue = true
    allSpotBookings.forEach((booking) => {
        if ((booking.startDate).getTime() === new Date(startDate).getTime()) {
            noIssue = false
            const err = new Error
            err.status = 403,
                err.title = "Booking conflict"
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
            }
            err.message = "Sorry, this spot is already booked for the specified dates"
            return next(err)
        }
        if ((booking.endDate).getTime() === new Date(endDate).getTime()) {
            noIssue = false
            const err = new Error
            err.status = 403,
                err.title = "Booking conflict"
            err.errors = {
                endDate: "End date conflicts with an existing booking"
            }
            err.message = "Sorry, this spot is already booked for the specified dates"
            return next(err)
        }
        if (((booking.startDate).getTime() < new Date(startDate).getTime()) && ((booking.endDate).getTime() > new Date(endDate).getTime())) {
            noIssue = false
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
        if (((booking.startDate).getTime() < new Date(startDate).getTime()) && ((booking.endDate).getTime() < new Date(endDate).getTime())) {
            noIssue = false
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
    if (currentUserId !== currentSpot.ownerId && noIssue === true) {
        /*~()Go through all the bookings for the spot and compare the dates~*/
        const newBooking = await Booking.create({
            startDate,
            endDate,
            spotId: currentSpot.id,
            userId: currentUserId
        })
        const jBooking = newBooking.toJSON()
        jBooking.startDate = jBooking.startDate.toISOString().split('T')[0]
        jBooking.endDate = jBooking.endDate.toISOString().split('T')[0]
        return res.json(jBooking)
    }
})














module.exports = router;
