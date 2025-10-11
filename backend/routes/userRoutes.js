const express = require('express');
const { Register, Login } = require('../Controllers/userCtrl');

const router = express.Router();

// Use lowercase for consistency in the routes
router.post('/register', Register);  // Changed from '/Register'
router.post('/login', Login);        // Changed from '/'

module.exports = router;
