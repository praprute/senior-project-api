const User = require('../models/users');
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