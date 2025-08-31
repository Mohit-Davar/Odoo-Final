import { api } from './BaseAPI';

export const getEvents = async () => {
    const { data } = await api.get('/events');
    return data;
};

export const getEventsByBooking = async () => {
    const { data } = await api.get('/events/booking');
    return data;
}

export const getEventsByProfile = async () => {
    const { data } = await api.get('/events/profile');
    return data;
};

export const getEventDetails = async (id) => {
    const { data } = await api.get(`/events/details/${id}`);
    return data;
}

export const getIssueById = async (id) => {
    const { data } = await api.get(`/events/${id}`);
    return data;
};

export const getIssueByProfile = async () => {
    const { data } = await api.get(`/issues/profile/`);
    return data;
};

export const createIssue = async (issue) => {
    const { data } = await api.post('/events', issue);
    return data;
};

export const updateIssue = async (id, issue) => {
    const { data } = await api.put(`/events/edit/${id}`, issue);
    return data;
};

export const deleteIssue = async (id) => {
    const { data } = await api.delete(`/issues/${id}`);
    return data;
};

export const getIssueCategories = async () => {
    const { data } = await api.get('/events/categories');
    return data;
};

export const getIssueStatuses = async () => {
    const { data } = await api.get('/issues/statuses');
    return data;
};