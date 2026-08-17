import client from './client';

export const fetchCart = () => client.get('/cart');
export const addCartItem = (laptop_id, quantity = 1) =>
  client.post('/cart/items', { laptop_id, quantity });
export const updateCartItem = (cartItemId, quantity) =>
  client.put(`/cart/items/${cartItemId}`, { quantity });
export const removeCartItem = (cartItemId) => client.delete(`/cart/items/${cartItemId}`);
