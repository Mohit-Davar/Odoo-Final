const pool = require('../service/db');

exports.getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error getting user by email: ${error.message}`);
        throw error;
    }
};

exports.insertUser = async (user) => {
    try {
        const { name, email, password } = user;
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error inserting user: ${error.message}`);
        throw error;
    }
};