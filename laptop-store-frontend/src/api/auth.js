import client from './client';

export const registerRequest = (data) => client.post('/register', data);
export const loginRequest = (data) => client.post('/login', data);
export const logoutRequest = () => client.post('/logout');
export const meRequest = () => client.get('/me');
