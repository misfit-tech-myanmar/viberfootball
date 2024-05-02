
const redis = require('redis');

// Replace these values with your Redis server's host and port
const redisHost = 'http://172.22.81.255/';
const redisPort = 6379; // Default Redis port is 6379

// Create a Redis client
const client = redis.createClient({
  host: 'localhost', // Redis server host
  port: 6379,        // Redis server port
  // Optionally, add authentication
  // password: 'your_password'
});

// Handle connection errors
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});



module.exports = client;