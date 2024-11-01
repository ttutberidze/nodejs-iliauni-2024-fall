const express = require('express');
const viewController = require('../controllers/view.controller');
const { viewAuthMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router
    .get('/login', viewController.getLoginPage)

router
    .get('/', viewAuthMiddleware, viewController.getTasksPage)

module.exports = router;