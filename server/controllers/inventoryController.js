const Material = require('../models/inventory');

const getAllMaterials = async (req, res) => {
  try {
    const material = await Material.find().populate('materials.material');
    res.json(material);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

const createMaterial = async (req, res) => {
  const { name, price, quantity, location } = req.body;
  
  if (!name || !price || !quantity || !location) {
    return res.json({ error: 'Existen campos vacíos.' });
  }

  const material = new Material({
    name,
    price,
    quantity,
    location
  });

  try {
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    res.json({ message: 'Material eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    material.quantity = req.body.quantity;
    material.lastupdated = new Date();
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProperties = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    material.name = req.body.name;
    material.price = req.body.price
    material.location = req.body.location;
    material.lastupdated = new Date();
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllMaterials,
  createMaterial,
  deleteMaterial,
  updateQuantity,
  updateProperties
};