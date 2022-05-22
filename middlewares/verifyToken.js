const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.verifyJwt = function verifyJwt(req, res, next) {
    try {
        const authToken = req.headers.token;
        if (!authToken) {
            res.json({
                message: "Please login!"
            })
        } 
        const token = authToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, function(err, user) {
            if (err) {
                res.status(403).json({
                    message: "token is not valid!"
                })
            }
            req.user = user;
            next();
        })  
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.verifyTokenAndAuth = function verifyTokenAndAuth(req, res, next) {
    verifyJwt(req, res, function() {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: "You are not authenticated"
            })
        }
    });
}

module.exports.verifyTokenAdmin = function verifyTokenAdmin(req, res, next) {
    verifyJwt(req, res, function() {
        if (req.user.isAdmin) {
            next();
        } else {
            res.json({
                message: "Only admin is allowed!"
            })
        }
    });
}