const {axiosInstance} = require('../libs/axios.instance');

let self;
function HistoryService(){
    self = this;
    self.Axios = axiosInstance;
}

HistoryService.prototype = {
    histories: (userId)=>{
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
                const data = [
                    { id: 1, name: 'John', createdAt: '2024-03-25' },
                    { id: 2, name: 'Jane', createdAt: '2024-03-25' },
                    { id: 3, name: 'Doe', createdAt: '2024-03-26' },
                    { id: 4, name: 'Alice', createdAt: '2024-03-26' },
                    { id: 5, name: 'Bob', createdAt: '2024-03-27' }
                  ];
                resolve(self.groupCreatedAt(data))
            }catch(err){
                console.log(err)
            }
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
    }
}

module.exports = HistoryService;