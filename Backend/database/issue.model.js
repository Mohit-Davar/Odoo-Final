const pool = require('../service/db');

// Issues
exports.createIssue = async (userID, issue) => {
    try {
        const {
            category_id,
            title,
            description,
            location,
            address,
            is_anonymous,
            pseudonym_id,
            status_id
        } = issue;
        const result = await pool.query(
            'INSERT INTO issues (user_id, category_id, title, description, location, address, is_anonymous, pseudonym_id, status_id) VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326), $7, $8, $9, $10) RETURNING *',
            [userID, category_id, title, description, location.x, location.y, address, is_anonymous, pseudonym_id, status_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error creating issue: ${error.message}`);
        throw error;
    }
};

exports.getIssues = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                i.title,
                i.description,
                i.address,
                i.is_anonymous,
                i.created_at,
                i.updated_at,
                ST_AsGeoJSON(i.location) AS geojson,
                ic.name AS category,
                istatus.name AS status,
                CASE WHEN i.is_anonymous THEN NULL ELSE u.id END AS user_id,
                CASE WHEN i.is_anonymous THEN NULL ELSE u.name END AS user_name,
                CASE WHEN i.is_anonymous THEN NULL ELSE up.avatar_url END AS user_avatar,
                p.pseudonym,
                ip.media_url AS photo_url
            FROM issues i
            JOIN issue_categories ic ON i.category_id = ic.id
            JOIN issue_statuses istatus ON i.status_id = istatus.id
            LEFT JOIN users u ON u.id = i.user_id
            LEFT JOIN user_profiles up ON up.user_id = u.id
            LEFT JOIN user_pseudonyms p ON p.id = i.pseudonym_id
            LEFT JOIN LATERAL (
                SELECT media_url FROM issue_photos ip
                WHERE ip.issue_id = i.id
                ORDER BY ip.created_at ASC
                LIMIT 1
            ) ip ON true
            ORDER BY i.created_at DESC;
        `);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issues: ${error.message}`);
        throw error;
    }
};

exports.getIssueByProfile = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT 
                i.id,
                i.title,
                i.description,
                i.address,
                i.is_anonymous,
                i.created_at,
                i.updated_at,
                ST_AsGeoJSON(i.location) AS geojson,
                ic.name AS category,
                istatus.name AS status,
                CASE WHEN i.is_anonymous THEN NULL ELSE u.id END AS user_id,
                CASE WHEN i.is_anonymous THEN NULL ELSE u.name END AS user_name,
                CASE WHEN i.is_anonymous THEN NULL ELSE up.avatar_url END AS user_avatar,
                p.pseudonym,
                ip.media_url AS photo_url
            FROM issues i
            JOIN issue_categories ic ON i.category_id = ic.id
            JOIN issue_statuses istatus ON i.status_id = istatus.id
            LEFT JOIN users u ON u.id = i.user_id
            LEFT JOIN user_profiles up ON up.user_id = u.id
            LEFT JOIN user_pseudonyms p ON p.id = i.pseudonym_id
            LEFT JOIN LATERAL (
                SELECT media_url FROM issue_photos ip
                WHERE ip.issue_id = i.id
                ORDER BY ip.created_at ASC
                LIMIT 1
            ) ip ON true
            WHERE i.user_id = $1
            ORDER BY i.created_at DESC;
        `, [userId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issues by profile: ${error.message}`);
        throw error;
    }
};

exports.getIssueById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error getting issue by ID: ${error.message}`);
        throw error;
    }
};

exports.updateIssue = async (id, issue) => {
    try {
        const {
            category_id,
            title,
            description,
            location,
            address,
            status_id
        } = issue;
        const result = await pool.query(
            'UPDATE issues SET category_id = $1, title = $2, description = $3, location = ST_SetSRID(ST_MakePoint($4, $5), 4326), address = $6, status_id = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
            [category_id, title, description, location.x, location.y, address, status_id, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error updating issue: ${error.message}`);
        throw error;
    }
};

exports.deleteIssue = async (id) => {
    try {
        const result = await pool.query('DELETE FROM issues WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error deleting issue: ${error.message}`);
        throw error;
    }
};

// Categories
exports.getIssueCategories = async () => {
    try {
        const result = await pool.query('SELECT * FROM issue_categories');
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issue categories: ${error.message}`);
        throw error;
    }
};

// Statuses
exports.getIssueStatuses = async () => {
    try {
        const result = await pool.query('SELECT * FROM issue_statuses');
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issue statuses: ${error.message}`);
        throw error;
    }
};

// Photos
exports.addIssuePhoto = async (photo) => {
    try {
        const {
            issue_id,
            media_url
        } = photo;
        const result = await pool.query(
            'INSERT INTO issue_photos (issue_id, media_url) VALUES ($1, $2) RETURNING *',
            [issue_id, media_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error adding issue photo: ${error.message}`);
        throw error;
    }
};

exports.getIssuePhotos = async (issueId) => {
    try {
        const result = await pool.query('SELECT * FROM issue_photos WHERE issue_id = $1', [issueId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issue photos: ${error.message}`);
        throw error;
    }
};

exports.deleteIssuePhoto = async (id) => {
    try {
        const result = await pool.query('DELETE FROM issue_photos WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error deleting issue photo: ${error.message}`);
        throw error;
    }
};

// Logs
exports.addIssueLog = async (log) => {
    try {
        const {
            issue_id,
            old_status_id,
            new_status_id,
            changed_by,
            comment
        } = log;
        const result = await pool.query(
            'INSERT INTO issue_logs (issue_id, old_status_id, new_status_id, changed_by, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [issue_id, old_status_id, new_status_id, changed_by, comment]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error adding issue log: ${error.message}`);
        throw error;
    }
};

exports.getIssueLogs = async (issueId) => {
    try {
        const result = await pool.query('SELECT * FROM issue_logs WHERE issue_id = $1', [issueId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issue logs: ${error.message}`);
        throw error;
    }
};