// backend/routes/api/index.js
// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// ADD SPOTSROUTER
router.use('/spots', spotsRouter)


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;














module.exports = router;
