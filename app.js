const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const { everySecond, everyMonday, everyAugest } = require('./utils/create-cron');
const bot = require('./libs/viber.bot')

const app = express();

const port = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use(bodyParser.json());

app.get('/', (req, res, next)=>{
    res.send("Welcome using WSL ON Window!!!")
})

// everyMonday();
// everySecond();
// everyAugest()

app.use("/viber/webhook", bot.middleware());

app.listen(port, (err) => {
    if(!err) console.log(`Server is running on ${port}`);
    bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
})