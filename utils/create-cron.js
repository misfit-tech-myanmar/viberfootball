var cron = require('node-cron');
const logger = require('../libs/logger');
const FootBallService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');
const NotificationService = require('../services/notification.service')
const {login} = require('../services/login.service')
const QuizService = require('../services/quiz.service');
const StoreRedisFromDatalab = require('../services/store.redis.datalab.service');
const CheckPredictionService = require('../services/prediction.check')
const moment = require('moment-timezone');

const footballService = new FootBallService();
const predictionService = new PredictionService();
const notificationService = new NotificationService(); 
const quizService = new QuizService()
const storeRedis = new StoreRedisFromDatalab();
const checkPredictionService = new CheckPredictionService()

module.exports = {
    every5Minutes: () => {
        cron.schedule('*/5 * * * *', async() => {
            const currentDate = moment.tz('Asia/Yangon').format('YYYY-MM-DD');
            const tomorrowDate = moment.tz('Asia/Yangon').add(1, 'days').format('YYYY-MM-DD');
            const dayAfterTomorrowDate = moment.tz('Asia/Yangon').add(2, 'days').format('YYYY-MM-DD');
            const yesterdayDate = moment.tz('Asia/Yangon').subtract(1, 'days').format('YYYY-MM-DD');
            // footballService.getFixtureFromApiAndPostToMyaliceDataLab('2024-06-14', '2024-06-27')
            console.log("current date: ", currentDate)
            console.log("tomorrow date: ", yesterdayDate)
            footballService.updateFixtureAfterFinishedMatches(yesterdayDate, tomorrowDate);
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
        const currentDate = moment.tz('Asia/Yangon').format('YYYY-MM-DD');
            const tomorrowDate = moment.tz('Asia/Yangon').add(1, 'days').format('YYYY-MM-DD');
            const dayAfterTomorrowDate = moment.tz('Asia/Yangon').add(7, 'days').format('YYYY-MM-DD');
        cron.schedule('0 0 * * *', ()=> {
            footballService.getFixtureFromApiAndPostToMyaliceDataLab(currentDate, dayAfterTomorrowDate)
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
           // await notificationService.sentNotiUserFavouriteTeam();
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
            //await notificationService.sentNotificationBefore30MinutesMatchStart()
        });
    },
    sentNotificationReSelectFavoriteTeam: () => {
        cron.schedule('30 11 16 8 *', async()=> {
            console.log("sending reselect fav team")
            //await notificationService.sentNotificationReSelectFavoriteTeam()
        })
    },
    sendNotificationToUsers: ()=> {
        cron.schedule('15 11 13 9 *', async()=> {
            await notificationService.sendNotification('customers', '158219')
        })
    }
}