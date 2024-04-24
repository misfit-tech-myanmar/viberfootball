const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const { everySecond, everyMonday, everyAugest, everyMorningSixthAm, everyMonday7AM } = require('./utils/create-cron');
// const bot = require('./libs/viber.bot')
const indexRouter = require('./routes/index')
const {login} = require('./libs/axios.instance');
const moment = require('moment-timezone');
var cors = require('cors')
var logger = require('./libs/logger');

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

everyMonday();
everySecond();
everyAugest();
everyMonday7AM();
// everyMorningSixthAm();
app.use('/api/v1.0', indexRouter)

// app.use("/viber/webhook", bot.middleware());

app.listen(port, async(err) => {
    await login('kyawhlaingbwar18@gmail.com', 'alice@101')
    if(!err) logger.info(`Server is running on ${port}`);
    // bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
    //     console.log('Can not set webhook on following server. Is it running?');
    //     console.error(error);
    //     process.exit(1);
    // });
})