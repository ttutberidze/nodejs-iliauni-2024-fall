const {Schema, model} = require('mongoose');
const {ObjectId} = require('mongodb')
const {credentialsSchema} = require('./credentials.model')

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'ასაკის მითითება სავალდებულოა']
    },
    credentials: {
        type: ObjectId,
        ref: 'Credentials',
        required: false
    },
    credentials2: {
        type: credentialsSchema,
        required: false
    },
    tasks: [
        {
            type: ObjectId,
            ref: 'Task',
            required: false
        }
    ]
})

const User = model('User', userSchema);
module.exports = User;