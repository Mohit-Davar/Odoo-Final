const pool = require('../service/db');

// Issues
exports.createIssue = async (userID, issue) => {
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
};

exports.getIssues = async () => {
    const result = await pool.query('SELECT * FROM issues');
    return result.rows;
};

exports.getIssueById = async (id) => {
    const result = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
    return result.rows[0];
};

exports.updateIssue = async (id, issue) => {
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
};

exports.deleteIssue = async (id) => {
    const result = await pool.query('DELETE FROM issues WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Categories
exports.getIssueCategories = async () => {
    const result = await pool.query('SELECT * FROM issue_categories');
    return result.rows;
};

// Statuses
exports.getIssueStatuses = async () => {
    const result = await pool.query('SELECT * FROM issue_statuses');
    return result.rows;
};

// Photos
exports.addIssuePhoto = async (photo) => {
    const {
        issue_id,
        media_url
    } = photo;
    const result = await pool.query(
        'INSERT INTO issue_photos (issue_id, media_url) VALUES ($1, $2) RETURNING *',
        [issue_id, media_url]
    );
    return result.rows[0];
};

exports.getIssuePhotos = async (issueId) => {
    const result = await pool.query('SELECT * FROM issue_photos WHERE issue_id = $1', [issueId]);
    return result.rows;
};

exports.deleteIssuePhoto = async (id) => {
    const result = await pool.query('DELETE FROM issue_photos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Logs
exports.addIssueLog = async (log) => {
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
};

exports.getIssueLogs = async (issueId) => {
    const result = await pool.query('SELECT * FROM issue_logs WHERE issue_id = $1', [issueId]);
    return result.rows;
};