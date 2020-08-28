const { Order, CartItem } = require("../models/order");
const { FarmerOrder } = require("../models/orderFarmer")
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    // console.log("CREATE ORDER: ", req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    for(i = 0 ; i < req.body.order.products.length ; i++){
        var farmData = {
            product : req.body.order.products[i],
            farmer  : req.body.order.products[i].farmer,
            user    : req.body.order.user,
            address : req.body.order.address,
            count   : req.body.order.products[i].count
        }
        const farmer = new FarmerOrder(farmData);
        farmer.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            // else{
            //     console.log(data)
            // }
        });
    }
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.listOrdersFarmer = (req, res) => {
    console.log("listFarmer")
    console.log(req.body.id)
    FarmerOrder.find({"farmer":req.body.id})
        .populate('product')
        .populate('farmer')
        .populate('user')
        .sort([['datefield', 'asc']])
        .exec((err, OrderData) => {
            if(err){
                return res.status(400).json({
                    error: 'Not order.'
                });
            }
            console.log(OrderData.length)
            res.json(OrderData)
        })    
} 

// exports.listOrders = (req, res, farmerId) => {
//     const farmer = req.body.farmerId
//     console.log(req.body)
//     Order.find()
//         .populate("user", "_id name address")
//         .populate("farmer")
//         .sort("-created")
//         .exec((err, orders) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: errorHandler(error)
//                 });
//             }
//             res.json(orders);
//         });
// };

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.updateOrderStatus = (req, res) => {
    FarmerOrder.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    );
};

