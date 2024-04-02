const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage } = require('../../db/models');
const { Association } = require('sequelize');


const router = express.Router();


const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .not()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .not()
        .isInt({ min: 0, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


//GET ALL REVIEWS OF THE CURRENT USER
router.get('/current', requireAuth, async (req, res) => {

    const currentUserId = req.user.id
    const Reviews = await Review.findAll({
        where: { userId: currentUserId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,

            }
        ]
    })
    res.json({ Reviews })
})



//ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const Id = req.params.reviewId
    const { url } = req.body
    const review = await Review.findByPk(Id)
    //ERROR IF REVIEW ID DOES NOT EXISt
    if (!review) {
        //console.log('hello')
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Review with the specified id"
        err.message = "Review couldn't be found"
        return next(err)
    }
    //⬇️⬇️⬇️⬇️⬇️
    //Error response: Cannot add any more images because there is a maximum
    // of 10 images per resource
    const newImage = await ReviewImage.create({
        url,
        reviewId: Id
    })

    const reviewImage = {}
    reviewImage.id = newImage.id
    reviewImage.url = newImage.url

    res.json(reviewImage)
})


//EDIT A REVIEW

//DELETE A REVIEW





module.exports = router;
