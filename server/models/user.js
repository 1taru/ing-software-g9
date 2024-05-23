
const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    username: {
        type:String,
        unique: true
    },
    accType: String,
    password: String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel