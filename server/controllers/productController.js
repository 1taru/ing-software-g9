const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        details: req.body.details
    });

    if(!product.name){
        return res.json({
            error: 'Se requiere un nombre para el producto.'
        })
    };
    if(!product.details){
        return res.json({
            error: 'Se requiere un nombre para el producto.'
        })
    };
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
