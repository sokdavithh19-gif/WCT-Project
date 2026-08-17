import client from './client';

// params: { search, brand, min_price, max_price, sort, page }
export const fetchLaptops = (params = {}) => client.get('/laptops', { params });
export const fetchLaptop = (id) => client.get(`/laptops/${id}`);
