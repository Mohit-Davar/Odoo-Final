const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendee.controller.js');

router.post('/:eventId/register', attendeeController.registerForEvent);
router.get('/:eventId/attendees', attendeeController.getAttendees);
router.get('/my-bookings', attendeeController.getMyBookings);

module.exports = router;