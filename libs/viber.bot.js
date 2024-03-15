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
        "Buttons": [
            {
                "Columns": 6,
                "Rows": 1,
                "Text": "<br><font color=\"#494E67\"><b>Prediction</b></font>",
                "TextSize": "large",
                "TextHAlign": "center",
                "TextVAlign": "middle",
                "ActionType": "reply",
                "ActionBody": "PREDICT",
                "BgColor": "#f7bb3f",
                "Image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw22K_Je3FiJUoo7KDYfOHzi&ust=1710498265312000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCb-d7E84QDFQAAAAAdAAAAABAE"
            },
            {
            "Columns": 6,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Prediction</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "PREDICT",
            "BgColor": "#f7bb3f",
            "Image": "https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/5a953e9ee1e811ee943946c7a05a34b4.png"
        }, {
            "Columns": 6,
            "Rows": 2,
            "Text": "<br><font color=\"#494E67\"><b>Status</b></font>",
            "TextSize": "large",
            "TextHAlign": "center",
            "TextVAlign": "middle",
            "ActionType": "reply",
            "ActionBody": "STATUS",
            "BgColor": "#7eceea",
            "Image": "https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/5d131768e1e811eebd70d64fe0d5d2c9.png"
        }, {
            "Columns": 6,
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
            "Columns": 6,
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
            "Columns": 6,
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
            "Columns": 6,
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
    if(message.text === 'Prediction'){
        response.send(new TextMessage('This feature is constructing'))
    }else{
        response.send(your_message);
    }
    
});
// Perfect! Now here's the key part:
// bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
// 	// Echo's back the message to the client. Your bot logic should sit here.
//     console.log(message)
// 	response.send(message);
// });

module.exports = bot;