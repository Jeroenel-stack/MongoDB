import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const categoryService = {
  getAll: async () => {
    const response = await api.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return response.data;
  },

  create: async (categoryData) => {
    const response = await api.post(API_ENDPOINTS.CATEGORIES, categoryData);
    return response.data;
  },

  update: async (id, categoryData) => {
    const response = await api.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, categoryData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return response.data;
  }
};