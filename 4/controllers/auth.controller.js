const asyncCatch = require("../error/error");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../env')

module.exports.register = asyncCatch(async (req, res) => {
    const {email, password, confirmPassword, name, age} = req.body;
    const user = await User.create({email, password, confirmPassword, name, age})
    res.json(user)
})

module.exports.login = asyncCatch(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('User not found')
    }
    await user.validatePassword(password)
    const token = jwt.sign({email: user.email}, jwtSecret, {
        expiresIn: '1d'
    })
    res.json({
        user,
        token
    })
})