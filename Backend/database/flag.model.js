const pool = require('../service/db');

// Flags
exports.flagIssue = async (userId, flag) => {
    const {
        issue_id,
        reason,
        status_id
    } = flag;
    const result = await pool.query(
        'INSERT INTO issue_flags (issue_id, user_id, reason, status_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [issue_id, userId, reason, status_id]
    );
    return result.rows[0];
};

exports.getIssueFlags = async (issueId) => {
    const result = await pool.query('SELECT * FROM issue_flags WHERE issue_id = $1', [issueId]);
    return result.rows;
};

exports.updateIssueFlag = async (id, flag) => {
    const {
        status_id,
        resolved_by
    } = flag;
    const result = await pool.query(
        'UPDATE issue_flags SET status_id = $1, resolved_by = $2, resolved_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [status_id, resolved_by, id]
    );
    return result.rows[0];
};

// Statuses
exports.getFlagStatuses = async () => {
    const result = await pool.query('SELECT * FROM flag_statuses');
    return result.rows;
};
