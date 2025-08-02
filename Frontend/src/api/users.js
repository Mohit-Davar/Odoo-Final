import BaseAPI from './BaseAPI';

export const getUserProfile = async () => {
    const { data } = await BaseAPI.get('/users/profile');
    return data;
};

export const createUserProfile = async (profile) => {
    const { data } = await BaseAPI.post('/users/profile', profile);
    return data;
};

export const updateUserProfile = async (profile) => {
    const { data } = await BaseAPI.put('/users/profile', profile);
    return data;
};

export const getUserLocation = async () => {
    const { data } = await BaseAPI.get('/users/location');
    return data;
};

export const createUserLocation = async (location) => {
    const { data } = await BaseAPI.post('/users/location', location);
    return data;
};

export const updateUserLocation = async (location) => {
    const { data } = await BaseAPI.put('/users/location', location);
    return data;
};

export const getUserPseudonyms = async () => {
    const { data } = await BaseAPI.get('/users/pseudonyms');
    return data;
};

export const createPseudonym = async (pseudonym) => {
    const { data } = await BaseAPI.post('/users/pseudonyms', { pseudonym });
    return data;
};
