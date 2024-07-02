const mongoose = require('mongoose');
const { Schema } = mongoose;

const changeLogSchema = new Schema({
    changedAt: { type: Date, default: Date.now },
    status: { type: String, required: true },
    details: { type: String, required: true }
});

const orderSchema = new Schema({
    name: { type: String, required: true },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, required: true }
        }
    ],
    creationDate: { type: String, required: true },
    status: { type: String, required: true },
    details: { type: String, required: true },
    creator: { type: String, required: true },
    changeLogs: [changeLogSchema]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
