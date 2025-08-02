const pool = require('../service/db');

// Flags
exports.flagIssue = async (userId, flag) => {
    try {
        const {
            issue_id,
            reason,
        } = flag;
        const result = await pool.query(
            'INSERT INTO issue_flags (issue_id, user_id, reason) VALUES ($1, $2, $3) RETURNING *',
            [issue_id, userId, reason]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error flagging issue: ${error.message}`);
        throw error;
    }
};

exports.getIssueFlags = async (issueId) => {
    try {
        const result = await pool.query('SELECT * FROM issue_flags WHERE issue_id = $1', [issueId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting issue flags: ${error.message}`);
        throw error;
    }
};

exports.updateIssueFlag = async (id, flag) => {
    try {
        const {
            status_id,
            resolved_by
        } = flag;
        const result = await pool.query(
            'UPDATE issue_flags SET status_id = $1, resolved_by = $2, resolved_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [status_id, resolved_by, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error updating issue flag: ${error.message}`);
        throw error;
    }
};

// Statuses
exports.getFlagStatuses = async () => {
    try {
        const result = await pool.query('SELECT * FROM flag_statuses');
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting flag statuses: ${error.message}`);
        throw error;
    }
};
