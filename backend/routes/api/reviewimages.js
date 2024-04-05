const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();


// DELETE A SPOT IMAGE BY ID
// ========================================
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    /*~()get the reviewImageId out of the request parameter~*/
    const currentImageId = req.params.imageId
    /*~()Make a call to the datatbase to find the reviewimagebyPK~*/
    const isReviewImage = await ReviewImage.findByPk(currentImageId)
    /*~()Get the current user out of the request body~*/
    const userId = req.user.id
    /*~()Error if no such image exists~*/
    if (!isReviewImage) {
        const err = new Error
        err.status = 404
        err.message = "Review Image couldn't be found"
        err.title = " Couldn't find a Review Image with the specified id"
        return next(err)
    }
    /*~()Store the review to which the image belongs in a variable~*/
    const review = isReviewImage.reviewId
    /*~()Make a call to the database to find the review with that image~*/
    const isReview = await Review.findByPk(review)
    /*~()Check to see if the review is owned by the current user~*/
    if (isReview.userId === userId) {
        await isReviewImage.destroy()
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








module.exports = router;
