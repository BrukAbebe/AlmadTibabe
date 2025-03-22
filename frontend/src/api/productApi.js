import apiClient from "./apiClient"; 

export const addProductApi = async (productData) => {
  try {
    const response = await apiClient.post('/api/admin/products/create', productData); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (productId) => {
  try {
    const response = await apiClient.delete(`/api/admin/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsApi = async (page, limit) => {
    try {
      const response = await apiClient.get(`/api/products?page=${page}&limit=${limit}`);
      return response.data;  
    } catch (error) {
      throw error;
    }
  };

  export const fetchProductByIdApi = async (productId) => {
    try {
      const response = await apiClient.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateProductApi = async (productId, productData) => {
    try {
      const response = await apiClient.patch(`/api/admin/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };