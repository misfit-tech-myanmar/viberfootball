const redis = require('ioredis');

// Create a Redis client
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    // Add any other options as needed
});

// Connect to Redis server
client.on('connect', function() {
    console.log('Connected to Redis');
});

// Handle errors
client.on('error', function(err) {
    console.error('Redis error:', err);
});

module.exports = client;