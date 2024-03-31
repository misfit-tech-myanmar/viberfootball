var cron = require('node-cron');
const FootBallService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');

const footballService = new FootBallService();
const predictionService = new PredictionService();
let currentDate = new Date();
// Extract year, month, and day components
const startDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
currentDate.setDate(currentDate.getDate() + 7);
let endDate = currentDate.toISOString().slice(0, 10);

module.exports = {
    everySecond: () => {
        cron.schedule('*/30 * * * * *', async() => {
            footballService.updateFixtureAfterFinishedMatches(startDate, startDate);
            predictionService.predict();
            footballService.getTeams();
            // footballService.getFixtureFromApiAndPostToMyaliceDataLab("2024-03-26", "2024-04-1")
        });
    },
    everyMonday: () => {
        cron.schedule('0 0 * * 1', ()=> {
            footballService.getFixtureFromApiAndPostToMyaliceDataLab(startDate, endDate)
        })
    },
    everyAugest: () => {
        // Schedule the task to run every August
        cron.schedule('0 0 1 8 *', () => {
            // Your task to be executed goes here
            footballService.addTeamToMyalice();
        });
    }
}