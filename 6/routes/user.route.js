const express = require('express');
const userController = require('../controllers/user.controller')
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')

router
    .get('/my', authMiddleware, userController.getMyUser)

router
    .route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router
    .get('/:userId', userController.getUser)



module.exports = router;