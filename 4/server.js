const app = require('./app');
const mongoose = require('mongoose');
const {mongoUri} = require('./env')

mongoose.connect(mongoUri).then(() => console.log('Connection to mongo was successful'))

app.listen(8888, () => {
    console.log('App has started on port 8888')
})