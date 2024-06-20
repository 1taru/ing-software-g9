const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getAllProducts, createProduct } = require('../controllers/productController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.get('/getProducts', getAllProducts);
router.post('/createProduct', createProduct);

module.exports = router;
