const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config()
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connection to mongo was successful'))

app.listen(8888, () => {
    console.log('App has started on port 8888')
})