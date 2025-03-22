import { addProductApi, deleteProductApi,fetchProductsApi, fetchProductByIdApi,updateProductApi} from './../api/productApi';

export const addProductData = async (productData) => {
  try {
    const data = await addProductApi(productData);
    return data;
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("Add Product Error (Development Mode):", error);
    }
    throw new Error(error.message || 'Something went wrong while adding the product. Please try again later.');
  }
};


export const deleteProductData = async (productId) => {
  try {
    const data = await deleteProductApi(productId);
    return data;
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("Delete Product Error (Development Mode):", error);
    }
    throw new Error(error.message || 'Something went wrong while deleting the product. Please try again later.');
  }
};


export const GetAllProducts = async (page, limit) => {
    try {
      const data = await fetchProductsApi(page, limit);
      return data;  
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error("Fetch Products Error (Development Mode):", error);
      }
      throw new Error(error.message || 'Something went wrong while fetching products. Please try again later.');
    }
  };
  

  export const GetProduct = async (productId) => {
    try {
      const data = await fetchProductByIdApi(productId);
      return data;
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error("Fetch Product By ID Error (Development Mode):", error);
      }
      throw new Error(error.message || 'Something went wrong while fetching the product. Please try again later.');
    }
  };

  export const updateProductData = async (productId, productData) => {
    try {
      const data = await updateProductApi(productId, productData);
      return data;
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error("Update Product Error (Development Mode):", error);
      }
      throw new Error(error.message || 'Something went wrong while updating the product. Please try again later.');
    }
  };