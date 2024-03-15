const axios = require('axios');

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'https://api.myalice.ai', // Replace 'https://api.example.com/' with your actual base URL
    timeout: 5000, // Optional: Set request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Optional: Set default headers,
      'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNDEwNDk5LCJpYXQiOjE3MTAzODg4OTksImp0aSI6ImMxMWU3YzI5NTBiNzRjZWJhYmFlYWQ0YTNiNDYyMDU3IiwidXNlcl9pZCI6ODF9.ZcDq2cPnn2B1PKift8Wf5fCDnh056JiY6lWe7vb8m7Y'
    }
  });

module.exports = axiosInstance;