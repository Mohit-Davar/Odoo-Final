const express = require('express');
const router = express.Router();
const event = require('../controllers/event.controller');

//Issues
router.route('/')
    .get(event.getEvents);

module.exports = router;