const {Schema, model} = require('mongoose');
const {ObjectId} = require('mongodb')
const {credentialsSchema} = require('./credentials.model')
const bcrypt = require('bcrypt')

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
    ],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: false
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next()
    }
    if(this.password !== this.confirmPassword) {
        throw new Error('Passwords should match')
    }
    // hash password
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined;
    next()
})

userSchema.methods.validatePassword = async function(passwordToCheck) {
    if(await bcrypt.compare(passwordToCheck, this.password)) {
        return true;
    }
    throw new Error('Email and password combination does not match')
}

const User = model('User', userSchema);
module.exports = User;