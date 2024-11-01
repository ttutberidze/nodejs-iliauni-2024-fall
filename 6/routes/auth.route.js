const express = require('express');
const authController = require('../controllers/auth.controller')
const router = express.Router();

router
    .route('/register')
    .post(authController.register)

router
    .route('/login')
    .post(authController.login)

router
    .route('/view-login')
    .post(authController.viewLogin)

module.exports = router;