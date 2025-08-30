const express = require('express');
const router = express.Router();
const event = require('../controllers/event.controller');

router.route('/')
    .post(event.createEvent)
    .get(event.getEvents);

router.route('/profile')
    .get(event.getEventByProfile);

router.route('/categories')
    .get(event.getEventCategories);

router.route('/statuses')
    .get(event.getEventStatuses);

router.route('/:id')
    .get(event.getEventById)
    .put(event.updateEvent)
    .delete(event.deleteEvent);

// Photos
router.route('/photos')
    .post(event.addEventPhoto);

router.route('/photos/:eventId')
    .get(event.getEventPhotos);

router.route('/photos/:id')
    .delete(event.deleteEventPhoto);

const attendeeRouter = require('./attendee.route.js');
router.use('/', attendeeRouter);

module.exports = router;
