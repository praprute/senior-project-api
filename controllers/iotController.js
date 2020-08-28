const { Sensor } = require("../models/iotModels")
const { errorHandler } = require("../helpers/dbErrorHandler");
const { mongo } = require("mongoose");

exports.saveTemp = (req, res) => {
    // console.log(req)
    console.log('---------------------------------------')
    console.log(req.body)
    const valueSensor = new Sensor(req.body)
    valueSensor.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }else{
            res.json(data)
        }
    })
}

exports.readTemp = (req, res) => {
    console.log(req.body.productId)
    var o_id = new mongo.ObjectID(req.body.productId)
    Sensor.find({'product': o_id})
        .populate('category')
        .populate('farmer')
        .sort({"createdAt": -1})
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: 'Data error.'
                });
            }
            res.json(data)
        })
    // var productId = new mongo.ObjectID()
}