const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'ასაკის მითითება სავალდებულოა']
    }
})

const User = model('User', userSchema);
module.exports = User;