const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const helper = require('./helpers/helper')
const { everySecond, everyStartOfDay, everyAugest, everyMorningSixthAm, everyMonday7AM, everyFiveHour30Minutes } = require('./utils/create-cron');
// const bot = require('./libs/viber.bot')
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const {login} = require('./services/login.service');
const moment = require('moment-timezone');
var cors = require('cors')
var logger = require('./libs/logger');
const FootBallService = require('./services/football.service')
const footballService = new FootBallService();

// footballService.addTeamToMyalice();

/**Mongodb Connect */
require('./utils/db.connect');

const app = express();
app.use(cors())

const port = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());




app.get('/', (req, res, next)=>{
    res.send("Welcome using WSL ON Window!!!")
})

everyStartOfDay();
everySecond();
everyAugest();
everyMonday7AM();
everyFiveHour30Minutes();
// everyMorningSixthAm();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1.0', indexRouter)
app.use('/admin', adminRouter)

// app.use("/viber/webhook", bot.middleware());

app.listen(port, async(err) => {
    await login()
    await helper.createAdminUser();
    if(!err) logger.info(`Server is running on ${port}`);
    // bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
    //     console.log('Can not set webhook on following server. Is it running?');
    //     console.error(error);
    //     process.exit(1);
    // });
})