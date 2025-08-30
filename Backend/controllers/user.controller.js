const user = require('../database/user.model');

// Profile
exports.createUserProfile = async (req, res) => {
    try {
        const userProfile = await user.createUserProfile(req.user.id, req.body);
        res.status(201).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userProfile = await user.updateUserProfile(req.user.id, req.body);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await user.getUserProfile(req.user.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};