const asyncCatch = require("../error/error");
const User = require("../models/user.model")

const getUsers = asyncCatch(async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

const createUser = asyncCatch(async (req, res) => {
    const user = new User(req.body);
    const newUser = await user.save();
    res.send(newUser)
})

module.exports = {
    getUsers, createUser
}