import client from './client';

export const checkout = () => client.post('/checkout');
export const fetchOrders = (page = 1) => client.get('/orders', { params: { page } });
export const fetchOrder = (id) => client.get(`/orders/${id}`);
