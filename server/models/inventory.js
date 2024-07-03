const mongoose = require('mongoose')
const {Schema} = mongoose

const materialSchema = new Schema({
    materials: [{
        material: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'inventario' // el nombre de tu modelo de Material
        }
    }],
    name: {
        type: String,
        required: true
    },
    doorType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    materialType: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    height: {
        type:Number,
        required: true
    },
    width: {
        type:Number,
        required: true
    },
    length: {
        type:Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lastupdated: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: false
    },
    umbral: {
        type: Number,
        default: 0
    }
})

const InventarioModel = mongoose.model('inventario', materialSchema)

module.exports = InventarioModel
