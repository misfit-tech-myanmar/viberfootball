const {axiosInstance} = require('../libs/axios.instance');

let self;
function HistoryService(){
    self = this;
    self.Axios = axiosInstance;
}

HistoryService.prototype = {
    histories: (userId,active)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const userHistories = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                const userPredictions = await self.getPredictionByUser(userId, userHistories.data.dataSource.map(item=> {
                    return {
                        matchId: item['5860'],
                        userId: item['5861'],
                        predict: item['5862'],
                        winLose: item['5897'],
                        createdAt: self.dateFormat(item.created_at)
                    };
                }))
                const predictions = await self.filterByActive(userPredictions, active);
                resolve(self.groupCreatedAt(predictions))
            }catch(err){
                console.log(err)
            }
        })
    },
    filterByActive: (data, active)=> {
        return new Promise(async(resolve, reject)=> {
            resolve(data.filter(item=> {
                if(active){
                    return item.winLose === undefined;
                }else{
                    return item.winLose !== undefined;
                }
            }))
        })
    },
    getPredictionByUser: (userId, predictions) => {
        return new Promise(async(resolve, reject) => {
            resolve(predictions.filter( item => {
                if(userId == item.userId){
                    return item;
                }
            }))
        })
    },
    groupCreatedAt: (data) => {
        const groupedData = {};
        data.forEach(item=> {
            const date = item.createdAt;
            if (!groupedData[date]) {
                // If not, create a new array for that date
                groupedData[date] = [];
            }
            groupedData[date].push(item)
        })
        return groupedData
    },
    dateFormat: (time) => {
        // Unix timestamp in seconds
        const unixTimestamp = time;

        // Convert Unix timestamp to milliseconds (required by Date constructor)
        const milliseconds = unixTimestamp * 1000;

        // Create a Date object
        const date = new Date(milliseconds);

        // Get the individual components of the date
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 because getMonth() returns zero-based month
        const day = ('0' + date.getDate()).slice(-2);
        const year = date.getFullYear().toString().slice(-2); // Extract last two digits of the year

        // Format the date as MM/DD/YY
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    },
    getHistoriesByDate:(date, userId, active) => {
        return new Promise(async(resolve, reject) => {
            try{
                const userPredictions = await self.getUserPredictions(date, userId);
                const predictions = await self.filterByActive(userPredictions, active)
                const fixtures = await self.getFixtures();
                const predictedFixtures = self.getPredictedFixtures(predictions, fixtures, date);
                resolve(predictedFixtures)
            }catch(err){
                console.log(err)
            }
        })
    },
    getUserPredictions: (date, userId) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const userHistories = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                var userPredictions = await self.getPredictionByUser(userId, userHistories.data.dataSource.map(item=> {
                    return {
                        matchId: item['5860'],
                        userId: item['5861'],
                        predict: item['5862'],
                        winLose: item['5897'],
                        createdAt: self.dateFormat(item.created_at)
                    };
                }))
                resolve(userPredictions)
            }catch(err){
                console.log(err)
            }
        })
    },
    getPredictedFixtures: (arr1, arr2, date) => {
        // var matchingObjects = arr1.filter(obj1 => {
        //     var matchObject2 =  arr2.find(obj2 => obj2['5766'] === obj1.matchId);
        //     if(matchObject2){
        //         return {obj1, matchObject2}
        //     }
        // });
        // return matchingObjects
        var matchingObjects = arr1.filter(obj1 => {
            var matchingObj2 = arr2.find(obj2 => obj2['5766'] === obj1.matchId);
            return matchingObj2;
        }).map(obj1 => {
            var matchingObj2 = arr2.find(obj2 =>obj2['5766'] === obj1.matchId);
            return { ...obj1, ...matchingObj2 };
        });
        return matchingObjects.filter(item=> item.createdAt === date)
    },
    getFixtures: () => {
        return new Promise(async(resolve, reject)=> {
            let response = await self.Axios.get('/stable/bots/labs/2247/entries');
            if(response.data.dataSource.length > 0){
                resolve(response.data.dataSource);
            }else{
                resolve('There is no fixtures.')
            }
        })
    }
}

module.exports = HistoryService;