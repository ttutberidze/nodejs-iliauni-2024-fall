const {Schema, model} = require('mongoose');

const credentialsSchema = Schema({
    email: {
        type: String,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
})

const Credentials = model('Credentials', credentialsSchema);
module.exports = {Credentials, credentialsSchema};