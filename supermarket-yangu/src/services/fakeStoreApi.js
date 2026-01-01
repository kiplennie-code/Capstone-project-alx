import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

// get single product
export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

// get categories list
export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/categories`);
  return response.data;
};

// get products by category
export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/products/category/${category}`);
  return response.data;
};
