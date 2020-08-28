const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, userlineById, read, update, purchaseHistory} = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin,(req, res) => {
    res.json({
        user: req.profile
    });
});
router.get('/secretline/:userLine', requireSignin, (req,res) => {
    res.json({
        user: req.profile
    });
})

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);

router.param('userId', userById);
router.param('userLine', userlineById);

module.exports = router;