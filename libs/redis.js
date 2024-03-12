
const redis = require('redis');

// Replace these values with your Redis server's host and port
const redisHost = 'http://172.22.81.255/';
const redisPort = 6379; // Default Redis port is 6379

let client;

(async () => {
  client = redis.createClient({ 
    url: `redis://localhost:6379`, 
 });

  try{
    await client.connect();
    console.log('Connected to  redis successfully.');
    await client.set('fixtures', JSON.stringify([
      {
        id: 1,
        match_id: 124,
        home_team_name: 'Arsenal FC',
        away_team_name: 'Manuchester United',
        home_team_goal: 3,
        away_team_goal: 1,
        match_status: 'Finished'
      },
      {
        id: 1,
        match_id: 125,
        home_team_name: 'Chelsea FC',
        away_team_name: 'Manuchester City',
        home_team_goal: 3,
        away_team_goal: 3,
        match_status: 'Finished'
      }
    ]));
    const fixtures = await client.get('fixtures')
    console.log(JSON.parse(fixtures))
  }catch(err){
    console.error('Connection to redis failed with error: ' , err)
  }
})();



module.exports = client;