const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

// Profile
router.route('/profile')
    .post(user.createUserProfile)
    .put(user.updateUserProfile)
    .get(user.getUserProfile);

module.exports = router