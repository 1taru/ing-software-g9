
const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    name: String,
    details: {
        type:String,
        unique: true
    }
})

const UserModel = mongoose.model('products', productSchema)

module.exports = UserModel