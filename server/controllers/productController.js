const Product = require('../models/product');
const Inventory = require('../models/inventory'); 

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('materials.material');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, details, materials } = req.body;

  if (!name || !details) {
    return res.json({
      error: 'Se requieren nombre y detalles para el producto.'
    });
  }

  // Verificar si los materiales existen
  for (const material of materials) {
    const invMaterial = await Inventory.findById(material.material);
    if (!invMaterial) {
      return res.status(404).json({ error: `Material no encontrado: ${material.material}` });
    }
  }

  const product = new Product({
    name,
    details,
    materials
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct
};
