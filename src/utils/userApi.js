import axios from 'axios';

const USER_API_URL = import.meta.env.VITE_API_URL;

export const userApi = axios.create({
  baseURL: USER_API_URL,
  withCredentials: true,
});

// 🔹 Додаємо accessToken перед кожним запитом
userApi.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔹 Обробка 401 — автооновлення accessToken
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

userApi.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return Promise.reject(error);

      try {
        const { data } = await axios.post(`${USER_API_URL}/auth/refresh`, {
          refreshToken,
        });

        // ⚠️ зберігаємо обидва токени!
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return userApi(originalRequest);
      } catch (e) {
        // refresh невдалий → чистимо токени
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
