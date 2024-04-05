// backend/routes/api/index.js
// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const reviewImagesRouter = require('./reviewimages.js');
const spotImagesRouter = require('./spotimages.js')
const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// ADD SPOTSROUTER
router.use('/spots', spotsRouter);

//ADD REVIEWSROUTER
router.use('/reviews', reviewsRouter);

// ADD BOOKINGSROUTER
router.use('/bookings', bookingsRouter)

// ADD REVIEWIMAGESROUTER
router.use('/review-images', reviewImagesRouter)

// ADD SPOTIMAGESROUTER
router.use('/spot-images', spotImagesRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;














module.exports = router;
