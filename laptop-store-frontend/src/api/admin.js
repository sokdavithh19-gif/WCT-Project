import client from './client';

// Dashboard
export const fetchDashboard = () => client.get('/admin/dashboard');

// Laptops (inventory) CRUD
export const adminFetchLaptops = (page = 1) => client.get('/admin/laptops', { params: { page } });
export const adminCreateLaptop = (data) => client.post('/admin/laptops', data);
export const adminUpdateLaptop = (id, data) => client.put(`/admin/laptops/${id}`, data);
export const adminDeleteLaptop = (id) => client.delete(`/admin/laptops/${id}`);

// Orders
export const adminFetchOrders = (params = {}) => client.get('/admin/orders', { params });
export const adminUpdateOrderStatus = (id, status) =>
  client.patch(`/admin/orders/${id}/status`, { status });

// Users
export const adminFetchUsers = (page = 1) => client.get('/admin/users', { params: { page } });
export const adminUpdateUserRole = (id, role) => client.patch(`/admin/users/${id}/role`, { role });
