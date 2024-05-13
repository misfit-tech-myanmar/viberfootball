const axios = require('axios');
const redisClient = require('./redis');


// Function to get access token from Redis
function getAccessToken(callback) {
  redisClient.get('accessToken', function(err, accessToken) {
      if (err) {
          callback(err, null);
      } else {
          callback(null, accessToken);
      }
  });
}

// Create an Axios instance with custom configurations
const axiosInstance = axios.create({
  baseURL: 'https://api.myalice.ai', // Base URL for all requests
  timeout: 5000, // Request timeout in milliseconds
  headers: {
      'Content-Type': 'application/json', // Example headers
  },
});

// Request interceptor to add access token to requests
axiosInstance.interceptors.request.use(
  config => {
    // Get access token from Redis
    return new Promise((resolve, reject) => {
      getAccessToken((err, accessToken) => {
        if (err) {
          console.error('Error getting access token from Redis:', err);
          reject(err);
        } else {
          console.log("getting access token => ", accessToken)
          // Make sure config object is defined
          config = config || {};
          // Make sure config.headers object is defined
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Token ${accessToken}`;
          resolve(config);
        }
      });
    });
  },
  error => {
    return Promise.reject(error);
  }
);

module.exports = {axiosInstance}