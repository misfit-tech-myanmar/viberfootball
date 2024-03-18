const axios = require('axios');

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'https://api.myalice.ai', // Replace 'https://api.example.com/' with your actual base URL
    timeout: 5000, // Optional: Set request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Optional: Set default headers,
      'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNzU0NzEyLCJpYXQiOjE3MTA3MzMxMTIsImp0aSI6IjdiNDdiYjI2ZjUwODQ2MjQ4Zjc3NTc4NzVjYzcwYTVlIiwidXNlcl9pZCI6ODF9.ZUXIQ3GE87HMwqTpJsHv0EKjC6nuNocboOigHjqaYV8'
    }
  });

module.exports = axiosInstance;