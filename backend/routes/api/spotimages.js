const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');

const router = express.Router();



// DELETE A SPOT IMAGE BY ID
// ========================================
router.delete('/:imageId',requireAuth, async (req, res, next) => {
    /*~()get the spotImageId out of the request parameter~*/
    const currentImageId = parseInt(req.params.imageId)
    /*~()Make a call to the datatbase to find the spotimagebyPK~*/
    const isSpotImage = await SpotImage.findByPk(currentImageId)
    /*~()Get the current user out of the request body~*/
    const userId = req.user.id
    /*~()Error if no such image exists~*/
    if (!isSpotImage) {
        const err = new Error
        err.status = 404
        err.message = "Spot Image couldn't be found"
        err.title = " Couldn't find a Spot Image with the specified id"
        return next(err)
    }
    /*~()Store the spot to which the image belongs in a variable~*/
    const spot = isSpotImage.spotId
    /*~()Make a call to the database to find the spot with that image~*/
    const isSpot = await Spot.findByPk(spot)
    console.log(isSpot)
    /*~()Check to see if the spot is owned by the current user~*/
    if (isSpot.ownerId === userId) {
        await isSpotImage.destroy()
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
