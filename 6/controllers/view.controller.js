const asyncCatch = require("../error/error");
const Task = require("../models/task.model");

module.exports.getLoginPage = asyncCatch(async(req, res) => {
    res.render('login')
})

module.exports.getTasksPage = asyncCatch(async(req, res) => {
    const tasks = await Task.find({user: req.user._id})
    res.render('tasks', {tasks})
})