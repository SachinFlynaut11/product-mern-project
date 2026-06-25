import API from "./axios";

export const signupUser = (data) =>
  API.post("/auth/signup", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getProfile = () =>
  API.get("/auth/profile");

export const getProducts = () =>
  API.get("/products");

export const addProduct = (data) =>
  API.post("/products", data);

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

export const likeProduct = (id) =>
  API.post(`/products/like/${id}`);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

export const getLikedProducts = () =>
  API.get("/products/liked/all");