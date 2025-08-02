import {api} from './BaseAPI';

export const getUserProfile = async () => {
    const { data } = await api.get('/user/profile');
    return data;
};

export const createUserProfile = async (profile) => {
    const { data } = await api.post('/user/profile', profile);
    return data;
};

export const updateUserProfile = async (profile) => {
    const { data } = await api.put('/user/profile', profile);
    return data;
};

export const getUserLocation = async () => {
    const { data } = await api.get('/user/location');
    return data;
};

export const createUserLocation = async (location) => {
    const { data } = await api.post('/user/location', location);
    return data;
};

export const updateUserLocation = async (location) => {
    const { data } = await api.put('/user/location', location);
    return data;
};

export const getUserPseudonyms = async () => {
    const { data } = await api.get('/user/pseudonyms');
    return data;
};

export const createPseudonym = async (pseudonym) => {
    const { data } = await api.post('/user/pseudonyms', { pseudonym });
    return data;
};
