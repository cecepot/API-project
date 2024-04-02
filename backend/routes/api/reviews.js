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
        .isInt({ gt: -1, lt: 6 })
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
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    let reviewId = req.params.reviewId
    const { review, stars } = req.body


    const userId = req.user.id
    const editedReview = await Review.findByPk(reviewId)

    //ERROR HANDLING
    if (!editedReview) {
        const err = new Error
        err.status = 404
        err.message = "Couldn't find a Review with the specified id"
        err.title = "Review couldn't be found"
        return next(err)
    }

    //AUTHORIZATION(works to some extent)
    if (userId === editedReview.userId) {
        if (review) editedReview.review = review
        if (stars) editedReview.stars = stars
        await editedReview.save()
    }
    return res.json(editedReview)
})


//DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    // ========= REFACTOR =============
    // NOTE: works perfectly 10/10 chef's kiss,😘
    //wish all my other routes would work like this
    const Id = req.params.reviewId
    const deletedReview = await Review.findByPk(Id)
    const userId = req.user.id


    //ERROR
    if (!deletedReview) {
        const err = new Error
        err.status = 404
        err.message = "Review couldn't be found"
        err.title = " Couldn't find a Review with the specified id"
        return next(err)
    }

    //AUTHORIZATION
    if (deletedReview.userId === userId) {
        await deletedReview.destroy()
        return res.json({
            "message": "Successfully deleted"
        })
    } else {
        return res.json({
            "message": "You are not authorized to perform this action"
        })
    }

})




module.exports = router;
