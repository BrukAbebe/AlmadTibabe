import apiClient from "./apiClient";

export const loginApi = async (credentials) => {
  try {
    const response = await apiClient.post('api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error; 
  }
};