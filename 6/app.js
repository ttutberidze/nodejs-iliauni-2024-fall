const express = require('express');
const userRouter = require('./routes/user.route');
const taskRouter = require('./routes/task.route');
const authRouter = require('./routes/auth.route');
const viewRouter = require('./routes/view.route');
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
var cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/auth', authRouter)
app.use('/', viewRouter)

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500).send({
        status: false,
        message: error.message
    })
})

module.exports = app;