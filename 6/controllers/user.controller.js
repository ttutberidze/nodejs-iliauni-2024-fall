const asyncCatch = require("../error/error");
const {Credentials} = require("../models/credentials.model");
const User = require("../models/user.model")

const getUsers = asyncCatch(async (req, res) => {
    const users = await User.find({}).populate('credentials').populate('tasks');
    res.send(users);
})

const createUser = asyncCatch(async (req, res) => {
    const {name, age, email, password} = req.body
    // const credentials = await Credentials.create({email, password})
    // const user = new User({
    //     name, age, credentials: credentials._id
    // });
    const user = new User({
        name, age, credentials2: {email, password}
    });
    const newUser = await user.save();
    res.send(newUser)
})

const getMyUser = asyncCatch(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    getUsers, createUser, getMyUser
}