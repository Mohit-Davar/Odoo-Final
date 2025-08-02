const issueModel = require('../database/issue.model');

// Issues
exports.createIssue = async (req, res) => {
    try {
        const issue = await issueModel.createIssue(req.user.id,req.body);
        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIssues = async (req, res) => {
    try {
        const issues = await issueModel.getIssues();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIssueByProfile = async (req, res) => {
    try {
        const issues = await issueModel.getIssueByProfile(req.user.id);
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIssueById = async (req, res) => {
    try {
        const issue = await issueModel.getIssueById(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateIssue = async (req, res) => {
    try {
        const issue = await issueModel.updateIssue(req.params.id, req.body);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteIssue = async (req, res) => {
    try {
        const issue = await issueModel.deleteIssue(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Categories
exports.getIssueCategories = async (req, res) => {
    try {
        const issueCategories = await issueModel.getIssueCategories();
        res.status(200).json(issueCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Statuses
exports.getIssueStatuses = async (req, res) => {
    try {
        console.log("bye")
        const issueStatuses = await issueModel.getIssueStatuses();
        res.status(200).json(issueStatuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Photos
exports.addIssuePhoto = async (req, res) => {
    try {
        const issuePhoto = await issueModel.addIssuePhoto(req.body);
        res.status(201).json(issuePhoto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIssuePhotos = async (req, res) => {
    try {
        const issuePhotos = await issueModel.getIssuePhotos(req.params.issueId);
        res.status(200).json(issuePhotos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteIssuePhoto = async (req, res) => {
    try {
        const issuePhoto = await issueModel.deleteIssuePhoto(req.params.id);
        if (!issuePhoto) {
            return res.status(404).json({ message: 'Issue photo not found' });
        }
        res.status(200).json({ message: 'Issue photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logs
exports.addIssueLog = async (req, res) => {
    try {
        const issueLog = await issueModel.addIssueLog(req.body);
        res.status(201).json(issueLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIssueLogs = async (req, res) => {
    try {
        const issueLogs = await issueModel.getIssueLogs(req.params.issueId);
        res.status(200).json(issueLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};