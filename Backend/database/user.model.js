const pool = require('../service/db');

// Profile
exports.createUserProfile = async (userId, profile) => {
    try {
        const {
            avatar_url,
            bio,
            phone_number
        } = profile;
        const result = await pool.query(
            'INSERT INTO user_profiles (user_id, avatar_url, bio, phone) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, avatar_url, bio, phone_number]
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
            name,
            avatar_url,
            bio,
            phone_number
        } = profile;

        // Start transaction
        await pool.query('BEGIN');

        // Update user name
        await pool.query(
            'UPDATE users SET name = $2 WHERE id = $1',
            [userId, name]
        );

        // Update user profile
        await pool.query(
            'UPDATE user_profiles SET avatar_url = $2, bio = $3, phone_number = $4, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1',
            [userId, avatar_url, bio, phone_number]
        );

        // Commit transaction
        await pool.query('COMMIT');

        // Return updated profile
        const result = await pool.query(`
            SELECT 
                u.name,
                up.avatar_url,
                up.bio,
                up.phone
            FROM users u
            LEFT JOIN user_profiles up ON u.id = up.user_id
            WHERE u.id = $1
        `, [userId]);

        return result.rows[0];
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(`[DATABASE] Error updating user profile: ${error.message}`);
        throw error;
    }
};

exports.getUserProfile = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.name,
                u.email,
                up.avatar_url,
                up.bio,
                up.phone
            FROM users u
            LEFT JOIN user_profiles up ON u.id = up.user_id
            WHERE u.id = $1
        `, [userId]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error getting user profile: ${error.message}`);
        throw error;
    }
};