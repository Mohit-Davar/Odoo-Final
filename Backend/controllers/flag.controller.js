const flag = require('../database/flag.model');

// Flags
exports.flagIssue = async (req, res) => {
    try {
        const issueFlag = await flag.flagIssue(req.user.id, req.body);
        res.status(201).json(issueFlag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIssueFlags = async (req, res) => {
    try {
        const issueFlags = await flag.getIssueFlags(req.params.issueId);
        res.status(200).json(issueFlags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateIssueFlag = async (req, res) => {
    try {
        const issueFlag = await flag.updateIssueFlag(req.params.id, req.body);
        if (!issueFlag) {
            return res.status(404).json({ message: 'Issue flag not found' });
        }
        res.status(200).json(issueFlag);
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
