var cron = require('node-cron');
const FootBallService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');

const footballService = new FootBallService();
const predictionService = new PredictionService();

module.exports = {
    everySecond: () => {
        let currentDate = new Date();
        // Extract year, month, and day components
        const startDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
        let endDate=currentDate.toISOString().slice(0, 10);
        cron.schedule('* * * * *', async() => {
            footballService.updateFixtureAfterFinishedMatches(startDate, startDate);
            predictionService.predict();
            footballService.getTeams();
            // footballService.getFixtureFromApiAndPostToMyaliceDataLab("2024-03-26", "2024-04-1")
        });
    },
    everyMonday: () => {
        let currentDateEveryMonday = new Date();
        // Extract year, month, and day components
        const startDate = `${currentDateEveryMonday.getFullYear()}-${currentDateEveryMonday.getMonth()+1}-${currentDateEveryMonday.getDate()}`;
        currentDateEveryMonday.setDate(currentDateEveryMonday.getDate() + 7);
        const endDate = currentDateEveryMonday.toISOString().slice(0, 10);
        console.log(endDate)
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