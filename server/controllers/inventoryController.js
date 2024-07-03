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
  const { name, price, category, doorType, materialType, height, width, quantity, length, location } = req.body;
  
  if (!name || !price || !quantity || !category || !doorType || !materialType || !height || !width || !length ) {
    return res.json({ error: 'Existen campos vacíos.' });
  }

  const material = new Material({
    name,
    doorType,
    category,
    materialType,
    height,
    width,
    length,
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
    material.doorType = req.body.doorType;
    material.category = req.body.category;
    material.materialType = req.body.materialType;
    material.height = req.body.height;
    material.width = req.body.width;
    material.length = req.body.length;
    
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateUmbral = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }
    material.umbral = req.body.umbral;
    material.lastupdated = new Date();
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMaterials,
  createMaterial,
  deleteMaterial,
  updateQuantity,
  updateProperties,
  updateUmbral
};