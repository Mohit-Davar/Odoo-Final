const attendeeModel = require('../database/attendee.model');
const eventModel = require('../database/event.model');
const { sendEmail } = require("../service/sendMail");
const { TicketEmail } = require("../service/emailTemplates");
const QRCode = require("qrcode")

exports.registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { attendees } = req.body;
        const userId = req.user.id;

        const event = await eventModel.getEventById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!attendees || !Array.isArray(attendees) || attendees.length === 0) {
            return res.status(400).json({ message: 'Attendees data is required.' });
        }

        const createdAttendees = await attendeeModel.createAttendees(eventId, userId, attendees);

        // Send email for each attendee
        await Promise.all(createdAttendees.map(async (attendee) => {
            const qrPayload = JSON.stringify({
                ticket_id: attendee.ticket_id,
                attendee_id: attendee.id,
                event_id: eventId
            });
            const qrCodeDataUrl = await QRCode.toDataURL(qrPayload);

            const html = TicketEmail({ name: attendee.name, event, ticket: attendee, qrCode: qrCodeDataUrl });

            await sendEmail(`Your Ticket for ${event.title}`, null, html, 3, attendee.email);
        }));

        res.status(201).json(createdAttendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;
        const attendees = await attendeeModel.getAttendeesByEventId(eventId);
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await attendeeModel.getBookingsByUserId(userId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};