const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSpot = [
    check('ownerId')
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('address')
        .notEmpty()
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('city')
        .notEmpty()
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('state')
        .notEmpty()
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('country')
        .notEmpty()
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('lat')
        .notEmpty()
        .exists({ checkFalsy: true }
        .isLength({ min: -90})
        .isLength({ max: 90})
        .withMessage('')),
    check('lng')
        .notEmpty()
        .exists({ checkFalsy: true }
        .isLength({ min: -180 })
        .isLength({ max: 180})
        .withMessage('')),
    check('name')
        .notEmpty()
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('description')
        .exists({ checkFalsy: true }
        .withMessage('')),
    check('price')
        .notEmpty()
        .exists({ checkFalsy: true }
        .withMessage('')),
    handleValidationErrors
]


//GET ALL SPOTS
router.get()

//GET ALL SPOTS BY CURRENT USER
router.get()

//GET DETAILS OF A SPOT BY ID
router.get()

//CREATE A SPOT
router.post()

//ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID
router.post()

//EDIT A SPOT
router.put()

//DELETE A SPOT
router.delete()


module.exports = router;
