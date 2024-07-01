const moment = require('moment-timezone');
const currentDate = moment.tz('Asia/Yangon').format('YYYY-MM-DD');
const tomorrowDate = moment.tz('Asia/Yangon').add(1, 'days').format('YYYY-MM-DD');
const dayAfterTomorrowDate = moment.tz('Asia/Yangon').add(2, 'days').format('YYYY-MM-DD');

module.exports = {
    sessionSecret: "J2uwp#5v&&dhXN5O", 
    dbUri: "mongodb://127.0.0.1:27017/360football",
    currentDate,
    tomorrowDate,
    dayAfterTomorrowDate
}