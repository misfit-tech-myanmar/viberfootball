const axios = require('axios');

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'https://api.myalice.ai', // Replace 'https://api.example.com/' with your actual base URL
    timeout: 5000, // Optional: Set request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Optional: Set default headers,
      'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNDk0MTQzLCJpYXQiOjE3MTA0NzI1NDMsImp0aSI6IjNjNTFmNDZmN2Q4ODRiMzZhODNmZmYwNTY2MDE5NTM0IiwidXNlcl9pZCI6ODF9.SW7r476-Gl2xZMZQr0WfT5jg7WJ-wfJNkXBTc74Xc6M'
    }
  });

module.exports = axiosInstance;