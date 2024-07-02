const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  details: { type: String, required: true, unique: true },
  materials: [
    {
      material: { type: Schema.Types.ObjectId, ref: 'inventario' },
      quantity: { type: Number, required: true }
    }
  ]
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
