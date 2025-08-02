const client = require("../service/db");

const getUser = async (email) => {
    const query = `SELECT 
                    id,
                    email AS user_email,
                    name AS user_name,
                    password AS user_password
                FROM users WHERE email = $1
            `;
    try {
        const { rows } = await client.query(query, [email]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
}
const getUserById = async (id) => {
    const query = `SELECT 
                    id,
                    email AS user_email,
                    name AS user_name,
                    password AS user_password
                FROM users WHERE id = $1
            `;
    try {
        const { rows } = await client.query(query, [id]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
}

const insertUser = async ({ name, email, password }) => {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, email AS user_email, name AS user_name
    `;
    try {
        const { rows } = await client.query(query, [name, email, password]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getUser, insertUser, getUserById }