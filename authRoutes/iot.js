const express = require("express");
const router = express.Router();

const { saveTemp, readTemp , readTempRealTime} = require("../controllers/iotController")

router.post("/dht11/tempsensor", saveTemp)
router.post("/getSensor/:productId" , readTemp)
router.post("/realtimeTemp", readTempRealTime)

module.exports = router;