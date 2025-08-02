const pool = require('../service/db');

// Profile
exports.createUserProfile = async (userId, profile) => {
    try {
        const {
            avatar_url,
            bio,
            date_of_birth,
            phone_number
        } = profile;
        const result = await pool.query(
            'INSERT INTO user_profiles (user_id, avatar_url, bio, date_of_birth, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, avatar_url, bio, date_of_birth, phone_number]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error creating user profile: ${error.message}`);
        throw error;
    }
};

exports.updateUserProfile = async (userId, profile) => {
    try {
        const {
            avatar_url,
            bio,
            date_of_birth,
            phone_number
        } = profile;
        const result = await pool.query(
            'UPDATE user_profiles SET avatar_url = $2, bio = $3, date_of_birth = $4, phone_number = $5, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *',
            [userId, avatar_url, bio, date_of_birth, phone_number]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error updating user profile: ${error.message}`);
        throw error;
    }
};

exports.getUserProfile = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.name,
                up.avatar_url,
                up.bio,
                up.date_of_birth,
                up.phone_number,
                ul.address,
                ul.city,
                ul.postal_code,
                ul.country
            FROM users u
            LEFT JOIN user_profiles up ON u.id = up.user_id
            LEFT JOIN user_locations ul ON u.id = ul.user_id
            WHERE u.id = $1
        `, [userId]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error getting user profile: ${error.message}`);
        throw error;
    }
};

// Location
exports.createUserLocation = async (userId, location) => {
    try {
        const {
            latitude,
            longitude,
            address,
            city,
            country,
            postal_code
        } = location;
        const result = await pool.query(
            'INSERT INTO user_locations (user_id, location, address, city, country, postal_code) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4, $5, $6, $7) RETURNING *',
            [userId, latitude, longitude, address, city, country, postal_code]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error creating user location: ${error.message}`);
        throw error;
    }
};

exports.updateUserLocation = async (userId, location) => {
    try {
        const {
            latitude,
            longitude,
            address,
            city,
            country,
            postal_code
        } = location;
        const result = await pool.query(
            'UPDATE user_locations SET location = ST_SetSRID(ST_MakePoint($2, $3), 4326), address = $4, city = $5, country = $6, postal_code = $7, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *',
            [userId, latitude, longitude, address, city, country, postal_code]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error updating user location: ${error.message}`);
        throw error;
    }
};

exports.getUserLocation = async (userId) => {
    try {
        const result = await pool.query('SELECT *, ST_X(location::geometry) as longitude, ST_Y(location::geometry) as latitude FROM user_locations WHERE user_id = $1', [userId]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error getting user location: ${error.message}`);
        throw error;
    }
};

// Pseudonym
exports.createPseudonym = async (userId, pseudonym) => {
    try {
        const result = await pool.query(
            'INSERT INTO user_pseudonyms (user_id, pseudonym) VALUES ($1, $2) RETURNING *',
            [userId, pseudonym]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error creating pseudonym: ${error.message}`);
        throw error;
    }
};

exports.getUserPseudonyms = async (userId) => {
    try {
        const result = await pool.query('SELECT * FROM user_pseudonyms WHERE user_id = $1', [userId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting user pseudonyms: ${error.message}`);
        throw error;
    }
};

// Roles
exports.getRoles = async () => {
    try {
        const result = await pool.query('SELECT * FROM roles');
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting roles: ${error.message}`);
        throw error;
    }
};

exports.assignRoleToUser = async (userRole) => {
    try {
        const {
            user_id,
            role_id
        } = userRole;
        const result = await pool.query(
            'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
            [user_id, role_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error assigning role to user: ${error.message}`);
        throw error;
    }
};

exports.getUserRoles = async (userId) => {
    try {
        const result = await pool.query('SELECT * FROM user_roles WHERE user_id = $1', [userId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting user roles: ${error.message}`);
        throw error;
    }
};
