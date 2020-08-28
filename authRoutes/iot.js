const express = require("express");
const router = express.Router();

const { saveTemp, readTemp } = require("../controllers/iotController")

router.post("/dht11/tempsensor", saveTemp)
router.post("/getSensor/:productId" , readTemp)

module.exports = router;