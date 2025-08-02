import { api } from './BaseAPI';

export const getIssues = async () => {
    const { data } = await api.get('/issues');
    return data;
};


export const getIssueById = async (id) => {
    const { data } = await api.get(`/issues/${id}`);
    return data;
};

export const getIssueByProfile = async () => {
    const { data } = await api.get(`/issues/profile/`);
    return data;
};

export const createIssue = async (issue) => {
    const { data } = await api.post('/issues', issue);
    return data;
};

export const updateIssue = async (id, issue) => {
    const { data } = await api.put(`/issues/${id}`, issue);
    return data;
};

export const deleteIssue = async (id) => {
    const { data } = await api.delete(`/issues/${id}`);
    return data;
};

export const getIssueCategories = async () => {
    const { data } = await api.get('/issues/categories');
    return data;
};

export const getIssueStatuses = async () => {
    const { data } = await api.get('/issues/statuses');
    return data;
};