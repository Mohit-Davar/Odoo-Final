const attendeeModel = require('../database/attendee.model');
const eventModel = require('../database/event.model');

exports.registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { attendees } = req.body;
        const userId = req.user.id;

        const event = await eventModel.getEventById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!attendees || !Array.isArray(attendees) || attendees.length === 0) {
            return res.status(400).json({ message: 'Attendees data is required.' });
        }

        const createdAttendees = await attendeeModel.createAttendees(eventId, userId, attendees);
        res.status(201).json(createdAttendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;
        const attendees = await attendeeModel.getAttendeesByEventId(eventId);
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};