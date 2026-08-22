import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/register") ||
      originalRequest?.url?.includes("/refresh-token");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${api.defaults.baseURL}/refresh-token`, {
            token: localStorage.getItem("refreshToken"),
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        const { data } = await refreshPromise;
        localStorage.setItem("token", data.token);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
