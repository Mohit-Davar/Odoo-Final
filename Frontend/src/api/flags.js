import { api } from './BaseAPI';

export const getFlagStatuses = async () => {
    const { data } = await api.get('/flags/statuses');
    return data;
};

export const flagIssue = async (issueId, reason) => {
    const { data } = await api.post('/flags', { issue_id: issueId, reason });
    return data;
};

export const getIssueFlags = async (issueId) => {
    const { data } = await api.get(`/flags/${issueId}`);
    return data;
};

export const updateIssueFlag = async (id, status) => {
    const { data } = await api.put(`/flags/${id}`, { status_id: status });
    return data;
};