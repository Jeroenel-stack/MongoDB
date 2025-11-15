import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const transactionService = {
  getAll: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.TRANSACTIONS, { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
    return response.data;
  },

  create: async (transactionData) => {
    const response = await api.post(API_ENDPOINTS.TRANSACTIONS, transactionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
    return response.data;
  }
};