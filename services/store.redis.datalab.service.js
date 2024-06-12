const redisClient = require('../libs/redis');
const {axiosInstance} = require('../libs/axios.instance');

let self;
function StoreRedisFromDatalab(){
    self = this;
    self.RedisClient = redisClient;
    self.Axios = axiosInstance;
}

StoreRedisFromDatalab.prototype = {
    storeRedisFromDataLab: () => {
        return new Promise(async(resolve, reject) => {
            const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
            const users = await self.Axios.get(`/stable/bots/labs/2241/entries?limit=${userResponse.data.count}`);

            const fixtureResponse = await self.Axios.get(`/stable/bots/labs/2247/entries`);
            const fixtures = await self.Axios.get(`/stable/bots/labs/2247/entries?limit=${fixtureResponse.data.count}`);
            
            const predictionResponse = await self.Axios.get(`/stable/bots/labs/2268/entries`);
            const predictions = await self.Axios.get(`/stable/bots/labs/2268/entries?limit=${predictionResponse.data.count}`);

            const teamResponse = await self.Axios.get(`/stable/bots/labs/2261/entries`);
            const teams = await self.Axios.get(`/stable/bots/labs/2261/entries?limit=${teamResponse.data.count}`);
            
            await self.RedisClient.set("users", JSON.stringify(users.data.dataSource), function(err, reply) {
                if (err) {
                    console.error('Error setting key:', err);
                } else {
                    console.log('users set to redis:', reply);
                }
            })
            await self.RedisClient.set("fixtures", JSON.stringify(fixtures.data.dataSource), function(err, reply) {
                if (err) {
                    console.error('Error setting key:', err);
                } else {
                    console.log('Fixtures set to redis :', reply);
                }
            })
            await self.RedisClient.set("user-predictions", JSON.stringify(predictions.data.dataSource), function(err, reply) {
                if (err) {
                    console.error('Error setting key:', err);
                } else {
                    console.log('User prediction set to redis:', reply);
                }
            })
            await self.RedisClient.set("teams", JSON.stringify(teams.data.dataSource), function(err, reply) {
                if (err) {
                    console.error('Error setting key:', err);
                } else {
                    console.log('team set to redis :', reply);
                }
            })
            resolve("Store successful data from datalab to redis")
        })
    },
    getDataFromRedis: () => {
        return new Promise(async(resolve, reject)=> {
            const users = await self.RedisClient.get('user-predictions')
            resolve(JSON.parse(users))
        })
    }
}

module.exports = StoreRedisFromDatalab;
