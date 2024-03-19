const axios = require('axios');

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'https://api.myalice.ai', // Replace 'https://api.example.com/' with your actual base URL
    timeout: 5000, // Optional: Set request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Optional: Set default headers,
      'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwODYwNzYyLCJpYXQiOjE3MTA4MzkxNjIsImp0aSI6IjFmMTdiY2MzYzFjYzQ0ODZhNWZiOTJiYWJlMGQzZjM5IiwidXNlcl9pZCI6ODF9.t_5KfN4labIEvbeaXxOG9cSMYSYVhp55X99PJ8lobHI'
    }
  });

module.exports = axiosInstance;