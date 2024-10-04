const asyncCatch = require("../error/error");
const Task = require("../models/task.model")

const getTasks = asyncCatch(async (req, res) => {
    const tasks = await Task.find(req.query);
    res.send(tasks);
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

module.exports = {
    getTasks, createTask, getStatistics
}