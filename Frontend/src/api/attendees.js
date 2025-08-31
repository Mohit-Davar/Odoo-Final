import { api } from "./BaseAPI";

export const getBookingsByUser = async () => {
    const response = await api.get("/events/my-bookings");
    return response.data;
};


export const getAttendeesByEvent = async (eventId) => {
    const { data } = await api.get(`/events/${eventId}/attendees`);
    return data;
};

export const registerForEvent = async (eventId, attendees) => {
    const { data } = await api.post(`/events/${eventId}/register`, { attendees });
    return data;
};

export const registerSingleAttendeeForEvent = async (eventId, attendee) => {
    return registerForEvent(eventId, [attendee]);
};