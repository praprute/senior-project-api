const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
    ObjectId
} = mongoose.Schema;

const OrderFarmer = new mongoose.Schema({
    order:{
        type: ObjectId,
        ref: "Order"
    },
    product: {
        type: ObjectId,
        ref: "Product"
    },
    farmer: {
        type: ObjectId,
        ref: "User"
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    address: String,
    updated: Date,
    count: Number,
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    }
}, {
    timestamps: true
})

const FarmerOrder = mongoose.model("FarmerOrder", OrderFarmer)

module.exports = {
    FarmerOrder
};