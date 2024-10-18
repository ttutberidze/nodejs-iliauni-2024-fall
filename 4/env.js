require('dotenv').config()

module.exports.mongoUri = process.env.MONGO_URI
module.exports.jwtSecret = process.env.JWT_SECRET