const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const { everySecond, everyMonday, everyAugest } = require('./utils/create-cron');
// const bot = require('./libs/viber.bot')
const indexRouter = require('./routes/index')
const {login} = require('./libs/axios.instance');
const moment = require('moment-timezone');


const app = express();

const port = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());




app.get('/', (req, res, next)=>{
    res.send("Welcome using WSL ON Window!!!")
})

everyMonday();
everySecond();
everyAugest();
app.use('/api/v1.0', indexRouter)
// Sample fixtures data
const fixtures = [
    { match_date: "2024-04-05", match_time: "14:18", teams: ["Team A", "Team B"] },
    { match_date: "2024-04-05", match_time: "15:30", teams: ["Team C", "Team D"] },
    { match_date: "2024-04-05", match_time: "16:45", teams: ["Team E", "Team F"] }
];

// Get the current time in Myanmar time zone
const myanmarTime = moment().tz('Asia/Yangon');

// Add one hour to the current time
const myanmarTimePlusOneHour = myanmarTime.clone().add(1, 'hour');

// Filter fixtures based on start time
const filteredFixtures = fixtures.filter(fixture => {
    const matchDateTime = moment(`${fixture.match_date} ${fixture.match_time}`, "YYYY-MM-DD HH:mm");
    return matchDateTime.isSameOrAfter(myanmarTimePlusOneHour);
});

// Display filtered fixtures
console.log("Fixtures scheduled to start at least one hour from now:");
filteredFixtures.forEach(fixture => {
    console.log(`Match Date: ${fixture.match_date}, Match Time: ${fixture.match_time}, Teams: ${fixture.teams.join(" vs ")}`);
});

// app.use("/viber/webhook", bot.middleware());

app.listen(port, async(err) => {
    await login('kyawhlaingbwar18@gmail.com', 'alice@101')
    if(!err) console.log(`Server is running on ${port}`);
    // bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
    //     console.log('Can not set webhook on following server. Is it running?');
    //     console.error(error);
    //     process.exit(1);
    // });
})