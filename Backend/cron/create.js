const cron = require('node-cron');
const pool = require("../service/db");
const { sendEmail } = require("../service/sendMail");


cron.schedule('* * * * *', async () => {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    try {
        const upcomingEvents = await pool.query(`
            SELECT e.id as event_id, e.title, e.start_datetime, a.user_id
            FROM events e
            JOIN attendees a ON e.id = a.event_id
            WHERE e.start_datetime > $1 AND e.start_datetime <= $2
        `, [now, oneHourFromNow]);

        for (let ev of upcomingEvents.rows) {
            // Set notification to be sent 1 hour before the event
            const notifyAt = new Date(new Date(ev.start_datetime).getTime() - 60 * 60 * 1000);

            await pool.query(`
                INSERT INTO event_notifications (event_id, user_id, message, notify_at)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (event_id, user_id) DO NOTHING;
            `, [ev.event_id, ev.user_id, `Reminder: Event ${ev.title} is starting in one hour!`, notifyAt]);
        }
    } catch (error) {
        console.error('[CRON] Error creating event notifications:', error.message);
    }
});

// Run every minute to send pending notifications
cron.schedule('* * * * *', async () => {
    const now = new Date();
    try {
        const notifications = await pool.query(`
            SELECT n.id, n.message, u.email
            FROM event_notifications n
            JOIN users u ON n.user_id = u.id
            WHERE n.notified = false AND n.notify_at <= $1
        `, [now]);

        for (let n of notifications.rows) {
            await sendEmail('Event Reminder', n.message, null, 3, n.email);

            // Mark as sent
            await pool.query('UPDATE event_notifications SET notified = true WHERE id = $1', [n.id]);
        }
    } catch (error) {
        console.error('[CRON] Error sending event notifications:', error.message);
    }
});