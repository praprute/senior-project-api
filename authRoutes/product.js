const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch,
    listAllByfarmer,
    removeByfarmer,
    updateByfarmer
} = require("../controllers/product");
const {
    requireSignin,
    isAuth,
    isAdmin
} = require("../controllers/auth");
const {
    userById
} = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.get("/products", list);

router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories)
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);
// new
router.get("/products/search", listSearch);
router.param("userId", userById);
router.param("productId", productById);
//Manage Product
router.post("/productsFarmer/:userId" , listAllByfarmer);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, removeByfarmer);
// router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, updateByfarmer);


module.exports = router;