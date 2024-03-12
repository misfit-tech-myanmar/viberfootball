const { Bot, Message } = require('viber-bot');
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
require('dotenv').config();
const aixosInstance = require('./axios.instance');

if (!process.env.BOT_ACCOUNT_TOKEN) {
    console.log('Could not find bot account token key.');
    return;
}if (!process.env.EXPOSE_URL) {
    console.log('Could not find exposing url');
    return;
}

const bot = new Bot({
    authToken: process.env.BOT_ACCOUNT_TOKEN,
    name: "Football Blogs",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
});

bot.onSubscribe(response => console.log(`Subscribed: ${response.userProfile.name}`));

const userProfile = {
    "id": "RidfVBiIj3k5DLoWIogj2w==",
    "name": "Linn Htet",
    "avatar": "https://media-direct.cdn.viber.com/download_photo?dlid=3FHQOeDmJzQ2GURSH2eINyLLQzlL_w7HhJbxL3P4gZGuYTnT_XUvEnxns-czryyhZo0XY1iJbWuIc2GogTEurU3RkvW94Pf1EBBQRtV5Ttzo_yVhxarRW86tdl69pSK9NppkHg&fltp=jpg&imsz=0000",
    "country": "MM",
    "language": "en",
    "scores": 0
  };

bot.onTextMessage(/^hi$/i, async(message, response) => {
    const userProfile = response.userProfile;
    // await aixosInstance.post('/users', {
    //     id: user.id,
    //     name: user.name,
    //     avatar: user.avatar,
    //     country: user.country,
    //     language: user.language,
    //     scores: 0
    // })
    const KEYBOARD_JSON = {
        "Type": "keyboard",
        "Buttons": [{
            "Columns": 2,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Prediction</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "PREDICT",
            "BgColor": "#f7bb3f",
            "Image": "https://s18.postimg.org/9tncn0r85/sushi.png"
        }, {
            "Columns": 2,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Status</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "STATUS",
            "BgColor": "#7eceea",
            "Image": "https://s18.postimg.org/ntpef5syd/french.png"
        }, {
            "Columns": 2,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>News</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "NEWS",
            "BgColor": "#f6f7f9",
            "Image": "https://s18.postimg.org/t8y4g4kid/mexican.png"
        }, {
            "Columns": 2,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Rating</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "RATING",
            "BgColor": "#dd8157",
            "Image": "https://s18.postimg.org/x41iip3o5/itallian.png"
        }, {
            "Columns": 2,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Prizes</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "PRIZES",
            "BgColor": "#f6f7f9",
            "Image": "https://s18.postimg.org/wq06j3jkl/indi.png"
        }, {
            "Columns": 2,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Other</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "OTHER",
            "BgColor": "#a8aaba",
            "Image": "https://s18.postimg.org/ylmyu98et/more_Options.png"
        }]
    }
    const your_message = new KeyboardMessage(KEYBOARD_JSON, null, null, null, 3); // If it didn't work with min_api_version 3, try 4
    console.log(message.text)
    if(message.text === 'Prediction'){
        response.send(new TextMessage('This feature is constructing'))
    }else{
        response.send(your_message);
    }
    
});

module.exports = bot;