import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
  // Get all products
  getAll: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  },

  // Get single product
  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  },

  // Create product
  create: async (productData) => {
    const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
    return response.data;
  },

  // Update product
  update: async (id, productData) => {
    const response = await api.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, productData);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  }
};