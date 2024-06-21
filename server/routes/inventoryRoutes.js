const express = require('express');
const router = express.Router();
const materialController = require('../controllers/inventoryController');
const cors = require('cors');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

router.get('/getMaterials', materialController.getAllMaterials);
router.post('/createMaterial', materialController.createMaterial);
router.delete('/:id',materialController.deleteMaterial);
router.put('/updateQuantity/:id', materialController.updateQuantity);
router.put('/updateProperties/:id', materialController.updateProperties);

module.exports = router;
