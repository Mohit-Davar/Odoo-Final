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

// Location
exports.createUserLocation = async (req, res) => {
    try {
        const userLocation = await user.createUserLocation(req.user.id, req.body);
        res.status(201).json(userLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserLocation = async (req, res) => {
    try {
        const userLocation = await user.updateUserLocation(req.user.id, req.body);
        res.status(200).json(userLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserLocation = async (req, res) => {
    try {
        const userLocation = await user.getUserLocation(req.user.id);
        if (!userLocation) {
            return res.status(404).json({ message: 'User location not found' });
        }
        res.status(200).json(userLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pseudonym
exports.createPseudonym = async (req, res) => {
    try {
        const pseudonym = await user.createPseudonym(req.user.id, req.body.pseudonym);
        res.status(201).json(pseudonym);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserPseudonyms = async (req, res) => {
    try {
        const pseudonyms = await user.getUserPseudonyms(req.user.id);
        res.status(200).json(pseudonyms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await user.getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignRoleToUser = async (req, res) => {
    try {
        const userRole = await user.assignRoleToUser(req.body);
        res.status(201).json(userRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserRoles = async (req, res) => {
    try {
        const userRoles = await user.getUserRoles(req.params.userId);
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
