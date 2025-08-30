const cron = require('node-cron');
const pool = require("../service/db");

// Run every minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    const upcomingEvents = await pool.query(`
    SELECT e.id as event_id, e.title, a.user_id, a.email
    FROM events e
    JOIN attendees a ON e.id = a.event_id
    WHERE e.start_datetime > $1
      AND e.start_datetime <= $2
  `, [now, new Date(now.getTime() + 24 * 60 * 60 * 1000)]); // events in next 1 hour

    for (let ev of upcomingEvents.rows) {
        await pool.query(`
      INSERT INTO event_notifications (event_id, user_id, message, notify_at)
      VALUES ($1, $2, $3, $4)
    `, [ev.event_id, ev.user_id, `Reminder: Event ${ev.title} is starting soon!`, ev.start_datetime]);
    }
});

cron.schedule('* * * * *', async () => {
    const now = new Date();
    const notifications = await pool.query(`
    SELECT * FROM event_notifications 
    WHERE notified = false AND notify_at <= $1
  `, [now]);

    for (let n of notifications.rows) {
        // Send email or push notification
        await sendEmail({
            to: n.user_id,
            subject: 'Event Reminder',
            text: n.message
        });

        // Mark as sent
        await db.query('UPDATE event_notifications SET notified = true WHERE id = $1', [n.id]);
    }
});
