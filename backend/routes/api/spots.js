const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models');
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
        .isLength({ min: -90 })
        .isLength({ max: 90 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isLength({ min: -180 })
        .isLength({ max: 180 })
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
    // You need to rework the avgRating and PreviewImage
    // associations to be a closer match with what is expected
    const allSpots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: [['stars', 'avgRating']]
        },
        {
            model: SpotImage,
            attributes: [['url', 'previewImage']]
        }]
    })


    return res.json(allSpots)

})

// //GET ALL SPOTS BY CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
    // ========= REFACTOR =============
     // NOTE: this code has (NOT) been tested!!!!
    const allSpots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: [['stars', 'avgRating']]
        },
        {
            model: SpotImage,
            attributes: [['url', 'previewImage']]
        }]
    })


    return res.json(allSpots)

})

// //GET DETAILS OF A SPOT BY ID
router.get('/:spotId', async (req, res, next) => {

    const spotId = req.params.spotId

    const spotDetails = await Spot.findByPk(spotId,
        {
            include: [
                {
                    model: Review,
                    attributes: [[sequelize.fn('COUNT', sequelize.col('review')), 'numReviews'], ['stars', 'avgStarRating']]
                },
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,//alias this as Owner
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        }
    )


    return res.json(spotDetails)

})

// //CREATE A SPOT
router.post('/', requireAuth, async (req, res, next) => {
// ========= REFACTOR =============
    // NOTE: this code has (NOT) been tested!!!!
    // You need to redo some validations
    // Modify validations after you're done setting up spots routes

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
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

    return res.json(newSpot)
})

// //ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID
// router.post()

// //EDIT A SPOT
// router.put()

// //DELETE A SPOT
// router.delete()


module.exports = router;
