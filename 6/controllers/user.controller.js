const asyncCatch = require("../error/error");
const {Credentials} = require("../models/credentials.model");
const User = require("../models/user.model")

const delay = (delayMs = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delayMs)
    })
}

const getUsers = asyncCatch(async (req, res) => {
    const users = await User.find({}).populate('credentials').populate('tasks');
    await delay(5000)
    console.log('fetch Users', Date.now())
    res.send(users);
})

const getUser = asyncCatch(async (req, res) => {
    const user = await User.findOne({_id: req.params.userId}).populate('credentials').populate('tasks');
    await delay(5000)
    console.log('fetch User', Date.now())
    res.send(user);
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
    getUsers, createUser, getMyUser, getUser
}