const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage } = require('../../db/models');
const { Association } = require('sequelize');


const router = express.Router();


const validateReview = [
    check('stars')
        .exists({ checkFalsy: true })
        .not()
        .withMessage('Review text is required'),
    check('review')
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
           where:{userId:currentUserId},
           include:[
            {
                model:User,
                attributes:['id', 'firstName', 'lastName']
            },
            {
                model:Spot,
                attributes:{
                    exclude:['description', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,

            }
        ]
    })
res.json({Reviews})
})





//ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID

//EDIT A REVIEW

//DELETE A REVIEW





module.exports = router;
