const pool = require('../service/db');

exports.createAttendees = async (eventId, userId, attendees) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const createdAttendees = [];
        for (const attendee of attendees) {
            const { name, email, phone, gender, ticketType } = attendee;
            const result = await client.query(
                `INSERT INTO attendees (event_id, user_id, name, email, phone, gender, ticket_type)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [eventId, userId, name, email, phone, gender, ticketType]
            );
            createdAttendees.push(result.rows[0]);
        }

        await client.query('COMMIT');
        return createdAttendees;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`[DATABASE] Error creating attendees: ${error.message}`);
        throw error;
    } finally {
        client.release();
    }
};

exports.getAttendeesByEventId = async (eventId) => {
    try {
        const result = await pool.query('SELECT * FROM attendees WHERE event_id = $1 ORDER BY created_at DESC', [eventId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting attendees by event ID: ${error.message}`);
        throw error;
    }
};