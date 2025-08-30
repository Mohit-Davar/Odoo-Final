const pool = require('../service/db');

// Flags
exports.flagEvent = async (userId, flag) => {
    try {
        const {
            event_id,
            reason,
        } = flag;
        const result = await pool.query(
            'INSERT INTO event_flags (event_id, user_id, reason) VALUES ($1, $2, $3) RETURNING *',
            [event_id, userId, reason]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error flagging event: ${error.message}`);
        throw error;
    }
};

exports.getEventFlags = async (eventId) => {
    try {
        const result = await pool.query('SELECT * FROM event_flags WHERE event_id = $1', [eventId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting event flags: ${error.message}`);
        throw error;
    }
};

exports.updateEventFlag = async (id, flag) => {
    try {
        const {
            status_id,
            resolved_by
        } = flag;
        const result = await pool.query(
            'UPDATE event_flags SET status_id = $1, resolved_by = $2, resolved_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [status_id, resolved_by, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error updating event flag: ${error.message}`);
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