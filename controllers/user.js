const User = require('../models/users');
const { Order } = require('../models/order')
const LineUesr = require('../models/lineuser');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.userlineById = (req, res, next, id) => {
    LineUesr.findById(id).exec((err, line) => {
        if (err || !line) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = line;
        next();
    })
}

//read, update, readline

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

// exports.readline = (req, res) => {

// }

exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true },
        (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: "Could not update user purchase history"
                });
            }
            next();
        }
    );
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

// const purchaseHistory = history => {
//     return (
//         <div className="card mb-5">
//             <h3 className="card-header">Purchase history</h3>
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     {history.map((h, i) => {
//                         return (
//                             <div>
//                                 <hr />
//                                 {h.products.map((p, i) => {
//                                     return (
//                                         <div key={i}>
//                                             <h6>Product name: {p.name}</h6>
//                                             <h6>Product price: ${p.price}</h6>
//                                             <h6>
//                                                 Purchased date:{" "}
//                                                 {moment(p.createdAt).fromNow()}
//                                             </h6>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         );
//                     })}
//                 </li>
//             </ul>
//         </div>
//     );
// };