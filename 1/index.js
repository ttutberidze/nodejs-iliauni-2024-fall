// const fs = require('fs')

// fs.writeFile('./data.txt', 'Hello WOrld', {}, (error) => {
//     console.log(error)
// })

// fs.writeFileSync('data2.txt', 'Hello')

// const http = require('http')

// const server = http.createServer((request, response) => {
//     console.log(request.url)
//     response.write("<h1>Hello</h1>")
//     response.write("<h2>Hello</h2>")
//     response.end('Finish')
// })

// server.listen(8888)

const express = require('express');
const bodyParser = require('body-parser');
const {router: productRouter} = require('./product/product')

const app = express();

app.use(bodyParser.json())
app.use(express.static('./public'))

app.use('/product', productRouter)

app.use('/', (req, res) => {
    res.send('<h1>HELLO</h1>')
})

app.listen(8888, () => {
    console.log('Server started at port 8888')
})