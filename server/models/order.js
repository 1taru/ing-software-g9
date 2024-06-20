// server/models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  relatedTo: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
