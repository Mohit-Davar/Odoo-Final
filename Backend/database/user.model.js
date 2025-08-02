const pool = require('../service/db');

// Profile
exports.createUserProfile = async (userId, profile) => {
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
};

exports.updateUserProfile = async (userId, profile) => {
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
};

exports.getUserProfile = async (userId) => {
    const result = await pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);
    return result.rows[0];
};

// Location
exports.createUserLocation = async (userId, location) => {
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
};

exports.updateUserLocation = async (userId, location) => {
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
};

exports.getUserLocation = async (userId) => {
    const result = await pool.query('SELECT *, ST_X(location::geometry) as longitude, ST_Y(location::geometry) as latitude FROM user_locations WHERE user_id = $1', [userId]);
    return result.rows[0];
};

// Pseudonym
exports.createPseudonym = async (userId, pseudonym) => {
    const result = await pool.query(
        'INSERT INTO user_pseudonyms (user_id, pseudonym) VALUES ($1, $2) RETURNING *',
        [userId, pseudonym]
    );
    return result.rows[0];
};

exports.getUserPseudonyms = async (userId) => {
    const result = await pool.query('SELECT * FROM user_pseudonyms WHERE user_id = $1', [userId]);
    return result.rows;
};

// Roles
exports.getRoles = async () => {
    const result = await pool.query('SELECT * FROM roles');
    return result.rows;
};

exports.assignRoleToUser = async (userRole) => {
    const {
        user_id,
        role_id
    } = userRole;
    const result = await pool.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
        [user_id, role_id]
    );
    return result.rows[0];
};

exports.getUserRoles = async (userId) => {
    const result = await pool.query('SELECT * FROM user_roles WHERE user_id = $1', [userId]);
    return result.rows;
};
