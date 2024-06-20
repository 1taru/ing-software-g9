
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');
const { getAllUsers, deleteUser } = require('../controllers/userController');

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test );
router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

//Manejo de usuarios por el admin

router.get('/users', getAllUsers);
router.delete('/users/:id',deleteUser);

module.exports = router