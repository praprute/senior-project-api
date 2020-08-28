const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrdersFarmer, getStatusValues, updateOrderStatus } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product")

router.post("/order/create/:userId", requireSignin, isAuth,  addOrderToUserHistory, decreaseQuantity, create);
router.post("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrdersFarmer);
router.post("/order/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValues);
router.put(
    "/order/:orderId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);
router.param("userId", userById);

module.exports = router;
