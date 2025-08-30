const eventModel = require('../database/event.model');

// Events
exports.createEvent = async (req, res) => {
    try {
        const event = await eventModel.createEvent(req.user.id,req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await eventModel.getEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventByProfile = async (req, res) => {
    try {
        const events = await eventModel.getEventsByProfile(req.user.id);
        res.status(200).json(events);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await eventModel.getEventById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await eventModel.updateEvent(req.params.id, req.body);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await eventModel.deleteEvent(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Categories
exports.getEventCategories = async (req, res) => {
    try {
        const eventCategories = await eventModel.getEventCategories();
        res.status(200).json(eventCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Statuses
exports.getEventStatuses = async (req, res) => {
    try {
        console.log("bye")
        const eventStatuses = await eventModel.getEventStatuses();
        res.status(200).json(eventStatuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Photos
exports.addEventPhoto = async (req, res) => {
    try {
        const eventPhoto = await eventModel.addEventPhoto(req.body);
        res.status(201).json(eventPhoto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventPhotos = async (req, res) => {
    try {
        const eventPhotos = await eventModel.getEventPhotos(req.params.eventId);
        res.status(200).json(eventPhotos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEventPhoto = async (req, res) => {
    try {
        const eventPhoto = await eventModel.deleteEventPhoto(req.params.id);
        if (!eventPhoto) {
            return res.status(404).json({ message: 'Event photo not found' });
        }
        res.status(200).json({ message: 'Event photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logs
exports.addEventLog = async (req, res) => {
    try {
        const eventLog = await eventModel.addEventLog(req.body);
        res.status(201).json(eventLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventLogs = async (req, res) => {
    try {
        const eventLogs = await eventModel.getEventLogs(req.params.eventId);
        res.status(200).json(eventLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
