import { loginApi } from './../api/authApi';

export const loginUser = async (credentials) => {
  try {
    const data = await loginApi(credentials);
    return data;
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("Login Error (Development Mode):", error);
    }
    throw new Error(error.message || 'Something went wrong with login. Please try again later.');
  }
};