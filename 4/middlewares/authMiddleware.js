const asyncCatch = require("../error/error");
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../env');
const User = require("../models/user.model");

module.exports.authMiddleware = asyncCatch(async (req, res, next) => {
    if(!req.headers.authorization) {
        throw new Error('Token is mandatory')
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    const {email} = jwt.verify(token, jwtSecret)
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('User not found')
    }
    if(user.isBlocked) {
        throw new Error('User is Blocked')
    }
    req.user = user;
    next()
})