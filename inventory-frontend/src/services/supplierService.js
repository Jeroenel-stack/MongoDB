import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const supplierService = {
  getAll: async () => {
    const response = await api.get(API_ENDPOINTS.SUPPLIERS);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.SUPPLIERS}/${id}`);
    return response.data;
  },

  create: async (supplierData) => {
    const response = await api.post(API_ENDPOINTS.SUPPLIERS, supplierData);
    return response.data;
  },

  update: async (id, supplierData) => {
    const response = await api.put(`${API_ENDPOINTS.SUPPLIERS}/${id}`, supplierData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.SUPPLIERS}/${id}`);
    return response.data;
  }
};