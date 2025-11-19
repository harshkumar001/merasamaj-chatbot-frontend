import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { KUTUMB_SERVER_DETAILS } from "../config/constants";

const API_BASE = KUTUMB_SERVER_DETAILS.NODE_URI;
const TOKEN_KEY = "token";

const api = axios.create({ baseURL: API_BASE, timeout: 15000 });

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token && config.headers)
      config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // ignore
  }
  return config;
});

export default api;
