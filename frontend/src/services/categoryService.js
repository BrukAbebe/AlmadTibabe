import { fetchCategoriesApi,fetchCategoryByIdApi } from './../api/categoryApi';



export const getCategories = async () => {
  try {
    const data = await fetchCategoriesApi();
    return data;
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("Fetch Categories Error (Development Mode):", error);
    }
    throw new Error(error.message || 'Something went wrong with fetching categories. Please try again later.');
  }
};
export const getCategoryById = async (categoryId,page,limit) => {
  try {
    const data = await fetchCategoryByIdApi(categoryId,page,limit);
    return data;
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error(`Fetch Category By ID Error (Development Mode):`, error);
    }
    throw new Error(error.message || `Something went wrong while fetching category with ID: ${categoryId}.`);
  }
};