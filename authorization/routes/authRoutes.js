const express = require('express');
const { registerUser, loginUser, adminOnly } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/admin',isAuthenticated,adminOnly)

module.exports = router;