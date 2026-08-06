//store-rating-platform/frontend/src/services/auth.service.js

import api from "../api/axios";

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};