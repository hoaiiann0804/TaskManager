const express = require('express');
const router = express.Router();
const { registerUser, loginUser, UserLogout, getProfile, updateProfile } = require('../controllers/user.controller');
const protect = require('../middleware/auth.middleware')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', UserLogout)

// Thêm routes cho profile (yêu cầu authentication)
// router.get('/profile', protect, getProfile); 
// router.put('/profile', protect, updateProfile);


module.exports = router;
