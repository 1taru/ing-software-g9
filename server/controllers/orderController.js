// server/controllers/orderController.js
const Order = require('../models/order');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  const { name, products, creationDate, status, details, creator } = req.body;
  
  if (!name || !products || !products.length || !creationDate || !status || !details || !creator) {
    return res.json({ error: 'Existen campos vacíos.' });
  }

  const order = new Order({
    name,
    products,
    creationDate,
    status,
    details,
    creator
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.json({ message: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  const { status, details } = req.body;
  if (!status || !details ) {
    return res.status(400).json({ error: 'Existen campos vacíos.' });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    // Actualizar el estado y los detalles
    order.status = status;
    order.details = details;

    // Agregar el cambio al log
    order.changeLogs.push({ status, details });

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderChangeLogs = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.json(order.changeLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  getOrderChangeLogs
};
