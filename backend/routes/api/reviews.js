const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage, SpotImage } = require('../../db/models');
const { Association } = require('sequelize');


const router = express.Router();


const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isFloat({ min: 0, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


//GET ALL REVIEWS OF THE CURRENT USER✅
//==========================================================
router.get('/current', requireAuth, async (req, res) => {
    /*~()Get the current user from the request body~*/
    const currentUserId = req.user.id
    /*~()Make a request to the database to get all reviews of the current user~*/
    const reviews = await Review.findAll({
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
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })
    /*~()Make a call to the database to get all the images for every spot~*/
    const Images = await SpotImage.findAll()
    /*~()Create a reveiews array to serve as a payload of some sort~*/
    const Reviews = []
    /*~()~*/
    reviews.forEach((review) => {
        /*~()~*/
        let rev = review.toJSON()
        /*~()~*/
        let images = []
        for (let ele of Images) {
            if (ele.spotId === rev.Spot.id) {
                images.push(ele.url)
            }
        }
        /*~()~*/
        rev.Spot.previewImage = images[0]
        /*~()~*/
        Reviews.push(rev)
    })
    /*~()~*/
    const payload = {
        Reviews
    }
    /*~()~*/
    return res.json(payload)
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID✅
// =========================================================================================
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    /*~()~*/
    const currentUser = req.user.id
    /*~()~*/
    const Id = req.params.reviewId
    /*~()~*/
    const allReviewImages = await ReviewImage.findAll({where:{reviewId : Id}})
       /*~()~*/
    const { url } = req.body
    /*~()~*/
    const review = await Review.findByPk(Id)
    //ERROR IF REVIEW ID DOES NOT EXISt
    if (!review) {
        const err = new Error
        err.status = 404
        err.title = "Couldn't find a Review with the specified id"
        err.message = "Review couldn't be found"
        return next(err)
    }
    /*~()    add authorization~*/
    if(review.userId === currentUser){
        //Error response: Cannot add any more images because there is a maximum
        // of 10 images per resource
        let JreviewImage = []
        allReviewImages.forEach((image)=>{
            image = image.toJSON()
            JreviewImage.push(image)
        })
        if(JreviewImage.length === 10){
         const err = new Error
        err.status = 403
        err.title = "Cannot add any more images because there is a maximum of 10 images per resource"
        err.message = "Maximum number of images for this resource was reached"
        return next(err)
        }else{
            /*~()~*/
         const newImage = await ReviewImage.create({
             url,
             reviewId: Id
         })
         /*~()~*/
         const reviewImage = {}
         reviewImage.id = newImage.id
         reviewImage.url = newImage.url
         /*~()~*/
         res.json(reviewImage)
        }}else{
        return res.json({
            "message": "You are not authorized to perform this action"
        })
    }
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




//EDIT A REVIEW
// ===========================================================================================
// 📝📝📝📝Yet to be tested in production
router.put('/:reviewId', [requireAuth, validateReview], async (req, res, next) => {
    /*~()~*/
    let reviewId = req.params.reviewId
    /*~()~*/
    const { review, stars } = req.body
    /*~()~*/
    const userId = req.user.id
    const editedReview = await Review.findByPk(reviewId)
    //ERROR HANDLING
    if (!editedReview) {
        const err = new Error
        err.status = 404
        err.message = "Review couldn't be found"
        err.title = "Couldn't find a Review with the specified id"
        return next(err)
    }
    //AUTHORIZATION(works to some extent)
    if (userId === editedReview.userId) {
        if (review !== undefined) editedReview.review = review
        if (stars !== undefined) editedReview.stars = stars
        await editedReview.save()
        return res.json(editedReview)
    } else {
        return res.json({
            "message": "You are not authorized to perform this action"
        })
    }
})


//DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    // 📝📝📝📝Yet to be tested in production
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
