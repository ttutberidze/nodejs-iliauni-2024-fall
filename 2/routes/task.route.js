const express = require('express');
const taskController = require('../controllers/task.controller')
const router = express.Router();

router
    .route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask)

router.get('/statistics', taskController.getStatistics)

module.exports = router;