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
      "Authorization" : "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NzM5NzI4LCJpYXQiOjE3MTQ3MTgxMjgsImp0aSI6Ijg0MjQyMDU4NmNkMDRmZGFiNjUwY2RlNGNkZDkwYjIwIiwidXNlcl9pZCI6ODF9.MY_yIXkx86OgIeph8gN_JTIoc_S90TqTJSZLC4_FLZs"
  },
});

// Request interceptor to add access token to requests
// axiosInstance.interceptors.request.use(
//   config => {
//     // Get access token from Redis
//     return new Promise((resolve, reject) => {
//       getAccessToken((err, accessToken) => {
//         if (err) {
//           console.error('Error getting access token from Redis:', err);
//           reject(err);
//         } else {
//           // Make sure config object is defined
//           config = config || {};
//           // Make sure config.headers object is defined
//           config.headers = config.headers || {};
//           config.headers['Authorization'] = `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NzM4MTExLCJpYXQiOjE3MTQ3MTY1MTEsImp0aSI6ImJjZDU0MTRlYzE4NDRhMDVhYmIwYTcxMjY1ODZhYzY0IiwidXNlcl9pZCI6ODF9.nfahD_sS6nZoAdtyrNGLbuI59u9FotVVujLyvqkpH0g`;
//           resolve(config);
//         }
//       });
//     });
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

module.exports = {axiosInstance}