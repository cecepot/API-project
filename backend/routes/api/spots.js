const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize, ReviewImage } = require('../../db/models');
const { Association } = require('sequelize');

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
        .isLength({ min: -90, max: 90 })//you should not be using is lenght.Try isfloat instead
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isLength({ min: -180, max: 180 })
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
        .withMessage('Price per day must be a positive number'),
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


    //*** ISSUE WITH PREVIEW! it duplicates get all spots when the spot has
    // multiple images

    //revisit preview. if preview === true,  preview = url?
    const Spots = await Spot.findAll({
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'price',
            'createdAt',
            'updatedAt',
            [sequelize.col('Reviews.stars'), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'preview']
        ],
        raw: true,
        include: [
            {
                model: Review,
                required: true,
                attributes: []
            },
            {
                model: SpotImage,
                required: true,
                attributes: []
            }
        ]
    })

    res.json({ Spots })
})

// //GET ALL SPOTS BY CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this has been tested on one user. It works
    // logout and test on other users
    const userId = req.user.id

    const Spots = await Spot.findAll({
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'price',
            'createdAt',
            'updatedAt',
            [sequelize.col('Reviews.stars'), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'preview']
        ],
        raw: true,
        include: [
            {
                model: Review,
                required: true,
                attributes: []
            },
            {
                model: SpotImage,
                required: true,
                attributes: []
            }
        ],
        where: { ownerId: userId }
    })

    res.json({ Spots })

})

// //GET DETAILS OF A SPOT BY ID
router.get('/:spotId', async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this has been tested on one user. It works
    // use either nested:false (in the model) or raw:true as a query option, to get rid of query name
    //come back and see if you can make a single call to the database
    const spotId = req.params.spotId

    const verifyId = await Spot.findByPk(spotId)
    //ERROR IF SPOT ID DOES NOT EXIST

    if (!verifyId) {
        //console.log('hello')
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Spot with the specified id"
        err.message = "Spot couldn't be found"
        return next(err)
    }


    const spotDetails = await Spot.findByPk(spotId,
        {
            attributes: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'price',
                'createdAt',
                'updatedAt',
                [sequelize.fn('COUNT', sequelize.col('Reviews.review')), 'numReviews'],
                [sequelize.col('Reviews.stars'), 'avgStarRating']
            ],
            // raw: true,
            include: [
                {
                    model: Review,
                    // attributes: [[sequelize.fn('COUNT', sequelize.col('review')), 'numReviews'], ['stars', 'avgStarRating']]
                    attributes: [],
                    nested: false
                },
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview'],
                    // nested: true
                },
                {
                    model: User,
                    as: 'Owner',//alias this as Owner when making changes to validations and constraints
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],

        }
    )


    return res.json(spotDetails)

})

// //CREATE A SPOT
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
            spotId: Id
        })

        res.json(newImage)

    }




})

// //EDIT A SPOT
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: this code has (NOT) been tested!!!!
    //console.log(req.params)
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
    if (userId === editedSpot.ownerId) {
        if (address) editedSpot.address = address
        if (city) editedSpot.city = city
        if (state) editedSpot.state = state
        if (country) editedSpot.country = country
        if (lat) editedSpot.lat = lat
        if (lng) editedSpot.lng = lng
        if (name) editedSpot.name = name
        if (description) editedSpot.description = description
        if (price) editedSpot.price = price
        await editedSpot.save()
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
        //console.log('hello')
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
        include:[
            {model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {model: ReviewImage}
        ]
    })


    res.json({ Reviews })
})


//CREATE A REVIEW FOR A SPOT BASED ON THE SPOT'S ID




module.exports = router;
