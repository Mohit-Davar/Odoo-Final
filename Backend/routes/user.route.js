const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

// Profile
router.route('/profile')
    .post(user.createUserProfile)
    .put(user.updateUserProfile)
    .get(user.getUserProfile);

// Location
router.route('/location')
    .post(user.createUserLocation)
    .put(user.updateUserLocation)
    .get(user.getUserLocation);

// Pseudonym
router.route('/pseudonym')
    .post(user.createPseudonym)
    .get(user.getUserPseudonyms);

// Roles
router.route('/roles')
    .get(user.getRoles)
    .post(user.assignRoleToUser);

router.route('/roles/:userId')
    .get(user.getUserRoles);

module.exports = router