const axios = require('axios');
// Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: 'https://api.myalice.ai',
});

let accessToken;
let refreshToken;

// Function to call login API and retrieve access token and refresh token
async function login(username, password) {
  try {
      const response = await axios.post('https://api.myalice.ai/stable/accounts/login', {
          username: username,
          password: password
      });
      
      // Assuming the response contains access token and refresh token
      accessToken = response.data.access;
      refreshToken = response.data.refresh;
      // Set access token as default header
      axiosInstance.defaults.headers.common['Authorization'] = `Token ${accessToken}`;

      console.log('Logged in successfully');
  } catch (error) {
      console.error('Error logging in:', error.message);
      throw new Error('Failed to log in');
  }
}

// Function to refresh access token
async function refreshAccessToken() {
  try {
      const response = await axios.post('refresh_token_endpoint', {
          refresh: refreshToken
      });
      accessToken = response.data.access;
      axiosInstance.defaults.headers.common['Authorization'] = `Token ${accessToken}`;
      console.log('Access token refreshed');
  } catch (error) {
      console.error('Error refreshing access token:', error.message);
      throw new Error('Failed to refresh access token');
  }
}

// Intercept request and add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
      // Check if access token exists and is not expired
      if (accessToken) {
          config.headers.Authorization = `Token ${accessToken}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Intercept response and handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
    console.log("refresh :", error)
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              await refreshAccessToken();
              return axiosInstance(originalRequest);
          } catch (refreshError) {
              return Promise.reject(refreshError);
          }
      }
      return Promise.reject(error);
  }
);

module.exports = {
  axiosInstance,
  login
}