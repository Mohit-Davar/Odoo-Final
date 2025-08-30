const flag = require('../database/flag.model');

// Flags
exports.flagEvent = async (req, res) => {
    try {
        const eventFlag = await flag.flagEvent(req.user.id, req.body);
        res.status(201).json(eventFlag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventFlags = async (req, res) => {
    try {
        const eventFlags = await flag.getEventFlags(req.params.eventId);
        res.status(200).json(eventFlags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEventFlag = async (req, res) => {
    try {
        const eventFlag = await flag.updateEventFlag(req.params.id, req.body);
        if (!eventFlag) {
            return res.status(404).json({ message: 'Event flag not found' });
        }
        res.status(200).json(eventFlag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Statuses
exports.getFlagStatuses = async (req, res) => {
    try {
        const flagStatuses = await flag.getFlagStatuses();
        res.status(200).json(flagStatuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};