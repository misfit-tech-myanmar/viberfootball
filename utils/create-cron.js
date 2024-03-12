var cron = require('node-cron');
const FootBallService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');

const footballService = new FootBallService();
const predictionService = new PredictionService();

module.exports = {
    everySecond: () => {
        cron.schedule('* * * * *', () => {
            predictionService.userPredict('RidfVBiIj3k5DLoWIogj2w==');
        });
    },
    everyMonday: () => {
        cron.schedule('0 0 * * 1', ()=> {
            // Get the current date
            let currentDate = new Date();
            // Extract year, month, and day components
            const startDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
            currentDate.setDate(currentDate.getDate() + 7);
            let endDate = currentDate.toISOString().slice(0, 10);
            footballService.getFixtureFromApiAndPostToMyaliceDataLab(startDate, endDate)
        })
    }
}