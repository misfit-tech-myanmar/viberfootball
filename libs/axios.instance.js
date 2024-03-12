const axios = require('axios');

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace 'https://api.example.com/' with your actual base URL
    timeout: 5000, // Optional: Set request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Optional: Set default headers
    }
  });

module.exports = axiosInstance;