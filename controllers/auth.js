const User = require('../models/users');
const LineUesr = require('../models/lineuser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    //console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.linesignin = (req, res) => {
    const line = new LineUesr(req.body);
    line.save((err, line) => {
        if(err){
            return res.status(400).json({
                err
            })
        }
        const token = jwt.sign({ _id: line._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire: new Date() + 9999})
        res.json({ token, line});
    })
}

exports.signin = (req, res) => {
    // find the user based on email
    const {email, password} = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err:'User with that email does not exist. Please signup'
            });
        }
        //if user is found make sure the email and pass word match
        // create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
        //persist the token as 't' i cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return respose with user and token to fronted cliend
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});

    });

};

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({
        message: "Signout Success"
    });

};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:"auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user){
            return res.status(403).json({
                error:"Access denied"
            });
        }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"Admin resourse! Access denied"
        });
    }
    next();
};