var cron = require('node-cron');
const logger = require('../libs/logger');
const FootBallService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');
const NotificationService = require('../services/notification.service')
const {login} = require('../services/login.service')
const QuizService = require('../services/quiz.service');

const footballService = new FootBallService();
const predictionService = new PredictionService();
const notificationService = new NotificationService(); 
const quizService = new QuizService()

module.exports = {
    everySecond: () => {
        let currentDate = new Date();
        // Extract year, month, and day components
        const startDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
        let endDate=currentDate.toISOString().slice(0, 10);
        cron.schedule('* * * * *', async() => {
            // footballService.getFixtureFromApiAndPostToMyaliceDataLab('2024-06-14', '2024-06-16')
            footballService.updateFixtureAfterFinishedMatches(startDate, startDate);
            predictionService.predict();
            footballService.getTeams();
            // footballService.getFixtureFromApiAndPostToMyaliceDataLab("2024-04-05", "2024-04-08")

        });
    },
    everyMonday: () => {
        let currentDateEveryMonday = new Date();
        // Extract year, month, and day components
        const startDate = `${currentDateEveryMonday.getFullYear()}-${currentDateEveryMonday.getMonth()+1}-${currentDateEveryMonday.getDate()}`;
        currentDateEveryMonday.setDate(currentDateEveryMonday.getDate() + 7);
        const endDate = currentDateEveryMonday.toISOString().slice(0, 10);
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
    },
    everyMorningSixthAm: () => {
        cron.schedule(' * * * * *', async()=> {
            await notificationService.sendNotiToPredictUsers();
        })
    },
    everyMonday7AM: () => {
        cron.schedule('0 7 * * 1', async()=> {
            await notificationService.sentNotiUserFavouriteTeam();
            await quizService.updateQuizEntryStatus();
        })
    },
    everyFiveHour30Minutes: () => {
        cron.schedule('*/30 */5 * * *', async()=> {
            await login();
        })
    }
}