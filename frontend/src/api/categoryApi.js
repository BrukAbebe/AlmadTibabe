import apiClient from './apiClient';

export const fetchCategoriesApi = async () => {
  try {
    const response = await apiClient.get('api/categories');
    return response.data;
  } catch (error) {
    throw error; 
  }
};
export const fetchCategoryByIdApi = async (categoryId,page,limit) => {
  try {
    const response = await apiClient.get(`/api/categories/${categoryId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};