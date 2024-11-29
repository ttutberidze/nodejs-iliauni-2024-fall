const asyncCatch = require("../error/error");
const Task = require("../models/task.model");
const User = require("../models/user.model");
const {ObjectId} = require('mongodb')

const delay = (delayMs = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delayMs)
    })
}

const getTasks = asyncCatch(async (req, res) => {
    console.log('Get Tasks Called')
    const tasks = await Task.find(req.query).populate('user');
    await delay(5000)
    res.send(tasks);
})

const getTask = asyncCatch(async (req, res) => {
    const task = await Task.findOne({_id: req.params.taskId});
    await delay(5000)
    res.send(task);
})

const createTask = asyncCatch(async (req, res) => {
    const task = new Task(req.body);
    const newTask = await task.save();
    res.send(newTask)
})

const getStatistics = asyncCatch(async (req, res) => {
    const result = await Task.aggregate([
        {
            $group: { 
                _id: "$priority", 
                totalEstimation: { $sum: "$estimation" },
                totalCount: { $sum: 1 }
            }
        }
    ])
    res.send(result)
})

const assignTaskToUser = asyncCatch(async (req, res) => {
    const {userId, taskId} = req.body;
    await Task.findOneAndUpdate({_id: taskId}, {user: userId})
    await User.findOneAndUpdate({_id: userId}, {$push: {tasks: new ObjectId(taskId)}})
    res.send({success: true})
})

module.exports = {
    getTasks, createTask, getStatistics, assignTaskToUser, getTask
}