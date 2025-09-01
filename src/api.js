import axios from "axios";

let getToken = async () => null;

export const setTokenGetter = (getter) => {
  getToken = getter;
};

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
