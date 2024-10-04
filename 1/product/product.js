const express = require('express');
const path = require('path')

const router = express.Router()

router.get('/:productId/:userId', (req, res) => {
    
    res.json({
        params: req.params,
        query: req.query
    })
})

router.post('/', (req, res) => {
    res.json(req.body)
})

router.use('/', (req, res) => {
//    res.sendFile('C:\\Users\\User\\WebstormProjects\\nodejs-iliauni-2024-fall\\1\\view\\product.html')
    res.sendFile(path.join(__dirname, '..', 'view', 'product.html'))
})

module.exports = {router}