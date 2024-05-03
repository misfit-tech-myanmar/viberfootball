const axios = require('axios');
const redisClient = require('../libs/redis');

const login =  () => {
    return new Promise(async(resolve, reject)=> {
        const response = await axios.post('https://api.myalice.ai/stable/accounts/login', {
            username: 'kyawhlaingbwar18@gmail.com',
            password: 'alice@101'
        });
        console.log(response.data)
        // await redisClient.set('accessToken', response.data.access)
        // Set a key
        redisClient.set('accessToken', response.data.access, function(err, reply) {
            if (err) {
                console.error('Error setting key:', err);
            } else {
                console.log('Set key:', reply);
            }
        });
        resolve()
    })
}

module.exports = {login};