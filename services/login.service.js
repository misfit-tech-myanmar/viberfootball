const axios = require('axios');
const redisClient = require('../libs/redis');

let self;
function LoginService(){
    self = this;
}

LoginService.prototype = {
    loginAndStoreToken: () => {
        return new Promise(async(resolve, reject)=> {
            const response = await axios.post('https://api.myalice.ai/stable/accounts/login', {
                username: 'kyawhlaingbwar18@gmail.com',
                password: 'alice@101'
            });
            console.log(response.data)
            await redisClient.set('accessToken', response.data.access)
            resolve()
        })
    }
}

module.exports = LoginService;