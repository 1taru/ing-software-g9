const Order = require('../models/order');
const Product = require('../models/product'); 
const Inventory = require('../models/inventory'); 

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

  try {
    // Verificar si hay suficiente inventario para todos los productos en la orden
    for (const product of products) {
      const prod = await Product.findById(product.product).populate('materials.material');
      if (!prod) {
        return res.status(404).json({ error: `Producto no encontrado: ${product.product}` });
      }
      for (const material of prod.materials) {
        const invMaterial = await Inventory.findById(material.material._id);
        if (!invMaterial || invMaterial.quantity < material.quantity * product.quantity) {
          return res.status(400).json({ error: `No se cuenta con suficiente stock para el material: ${material.material.name}` });
        }
      }
    }

    // Descontar el inventario para todos los productos en la orden
    for (const product of products) {
      const prod = await Product.findById(product.product).populate('materials.material');
      for (const material of prod.materials) {
        const invMaterial = await Inventory.findById(material.material._id);
        invMaterial.quantity -= material.quantity * product.quantity;
        await invMaterial.save();
      }
    }

    // Crear la orden
    const order = new Order({
      name,
      products,
      creationDate,
      status,
      details,
      creator
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error al crear la orden:', err); // Agregar registro de error detallado
    res.status(500).json({ message: 'Error al crear la orden', error: err.message });
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
