const express = require('express');
const router = express.Router();
const flag = require('../controllers/flag.controller');

// Event Flags
router.route('/')
    .post(flag.flagEvent);

router.route('/event/:eventId')
    .get(flag.getEventFlags);

router.route('/event/:id')
    .put(flag.updateEventFlag);

// Flag Statuses
router.route('/statuses')
    .get(flag.getFlagStatuses);

module.exports = router;