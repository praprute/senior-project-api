const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const SensorTemp = new mongoose.Schema(
    {
        temp: {
            type: mongoose.Types.Decimal128
            // type: Number
        },
        moisture:{
            type: mongoose.Types.Decimal128
            // type: Number
        },
        product:{
            type: ObjectId, 
            ref: "Product"
        }
    },{
        timestamps: true
    }
)

const Sensor = mongoose.model("Sensor", SensorTemp);
module.exports = { Sensor };
