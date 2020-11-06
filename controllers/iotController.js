const { Sensor } = require("../models/iotModels")
const { errorHandler } = require("../helpers/dbErrorHandler");
const { mongo } = require("mongoose");

exports.saveTemp = (req, res) => {
    const valueSensor = new Sensor(req.body)
    valueSensor.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }else{
            res.json(data)
            console.log(data)
        }
    })
}

exports.readTemp = (req, res) => {
    var o_id = new mongo.ObjectID(req.body.productId)
    Sensor.find({'product': o_id})
        .populate('category')
        .populate('farmer')
        .limit(20)
        .sort({"createdAt": -1})
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: 'Data error.'
                });
            }
            res.json(data)
        })
}

exports.readTempRealTime = (req, res) => {
    console.log('req.body')
    console.log(req.body)
    var o_id = new mongo.ObjectID(req.body.id)
    Sensor.find({'product': o_id})
        .populate('category')
        .populate('farmer')
        .limit(1)
        .sort({"createdAt": -1})
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: 'Data error.'
                });
            }
            res.json(data)
        })
}

