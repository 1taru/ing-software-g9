const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const cors = require('cors');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

router.get('/getOrders', orderController.getAllOrders);
router.post('/createOrder', orderController.createOrder);
router.delete('/:id',orderController.deleteOrder)
router.put('/:id', orderController.updateOrder);
router.get('/:id/changeLogs', orderController.getOrderChangeLogs); 

module.exports = router;
