import axios from 'axios';
const api = axios.create({
  baseURL:'http://localhost:8082/api',

  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*'
    'Accept': 'application/json'
  },
  withCredentials: true,
  timeout: 5000
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  response => response,
  error => {
      const errorResponse = {
          message: 'An error occurred',
          status: error.response?.status,
          data: error.response?.data
      };

      if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
      }

      console.log('API Error:', errorResponse);
      return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
//       // Only redirect if not already on login page
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
