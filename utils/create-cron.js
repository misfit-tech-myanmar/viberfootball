var cron = require('node-cron');
const logger = require('../libs/logger');
const FootBallService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');
const NotificationService = require('../services/notification.service')
const {login} = require('../services/login.service')
const QuizService = require('../services/quiz.service');
const StoreRedisFromDatalab = require('../services/store.redis.datalab.service');
const CheckPredictionService = require('../services/prediction.check')

const footballService = new FootBallService();
const predictionService = new PredictionService();
const notificationService = new NotificationService(); 
const quizService = new QuizService()
const storeRedis = new StoreRedisFromDatalab();
const checkPredictionService = new CheckPredictionService()
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

module.exports = {
    every5Minutes: () => {
        let currentDate = new Date();
        // Extract year, month, and day components
        const startDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
        let endDate=currentDate.toISOString().slice(0, 10);
        cron.schedule('*/5 * * * *', async() => {
            // footballService.getFixtureFromApiAndPostToMyaliceDataLab('2024-06-14', '2024-06-27')
            footballService.updateFixtureAfterFinishedMatches(startDate, startDate);
            footballService.getTeams();
        });
    },
    every10Minutes: () => {
        cron.schedule('* * * * *', async() => {
            console.log("running check prediction")
            await checkPredictionService.checkPrediction();
        });
    },
    every30Minutes: () => {
        cron.schedule("*/30 * * * *", async() => {
            await checkPredictionService.updateScoreAndSentNoti()
        })
    },
    every15Minutes: () => {
        cron.schedule('*/15 * * * *', async() => {
            storeRedis.storeRedisFromDataLab();
        });
    },
    everyStartOfDay: () => {
        const today = new Date();
        const dayAfterNext = new Date();
        dayAfterNext.setDate(today.getDate() + 2);
        cron.schedule('0 0 * * *', ()=> {
            footballService.getFixtureFromApiAndPostToMyaliceDataLab(getFormattedDate(today), getFormattedDate(dayAfterNext))
        })
    },
    everyAugest: () => {
        // Schedule the task to run every August
        cron.schedule('0 0 1 8 *', () => {
            // Your task to be executed goes here
            footballService.addTeamToMyalice();
        });
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
    },
    sentNotiBefore30MinutesMatchStart:() => {
        cron.schedule('* * * * *', async() => {
            await notificationService.sentNotificationBefore30MinutesMatchStart()
        });
    }
}