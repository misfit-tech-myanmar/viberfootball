const { Bot, Message } = require('viber-bot');
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
require('dotenv').config();
const aixosInstance = require('./axios.instance');
const KeyboardConfig = require('../configs/bot.keyboerd.json');
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const FootballService = require('../services/football.service');

const footballService = new FootballService();

if (!process.env.BOT_ACCOUNT_TOKEN) {
    console.log('Could not find bot account token key.');
    return;
}if (!process.env.EXPOSE_URL) {
    console.log('Could not find exposing url');
    return;
}

const bot = new Bot({
    authToken: process.env.BOT_ACCOUNT_TOKEN,
    name: "Testing",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
});


const userProfile = {
    "id": "RidfVBiIj3k5DLoWIogj2w==",
    "name": "Linn Htet",
    "avatar": "https://media-direct.cdn.viber.com/download_photo?dlid=3FHQOeDmJzQ2GURSH2eINyLLQzlL_w7HhJbxL3P4gZGuYTnT_XUvEnxns-czryyhZo0XY1iJbWuIc2GogTEurU3RkvW94Pf1EBBQRtV5Ttzo_yVhxarRW86tdl69pSK9NppkHg&fltp=jpg&imsz=0000",
    "country": "MM",
    "language": "en",
    "scores": 0
  };
// Event handler for when a conversation is started
bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>{
    console.log(userProfile)
    onFinish(new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3));
})

bot.on(BotEvents.MESSAGE_RECEIVED, async(message, response) => {
    const userProfile = response.userProfile;
    
    
    let messageLayout;
    if(message.text === "hi"){
        messageLayout = new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3);
        response.send(messageLayout);
    }else if(message.text === 'predict'){
        const fixtures = await footballService.getFixtures();
        fixtures.forEach(fixture=>{
            console.log(fixture)
            if(fixture['5778'] === ''){
                response.send(new RichMediaMessage({
                    "Type": "rich_media",
                    "ButtonsGroupColumns": 6,
                    "ButtonsGroupRows": 6,
                    "BgColor": "#FFFFFF", 
                    "BgMedia": "https://www.sofascore.com/news/wp-content/uploads/2017/07/Int.png",
                    "Buttons": [
                        {
                            "Columns": 6,
                            "Rows": 1,
                            "ActionType": "none",
                            "Text": `<font color="#0000FF">${fixture['5768']}</font>`,
                            "TextSize": "small",
                            "TextVAlign": "middle",
                            "TextHAlign": "center"
                        },
                        {
                            "Columns": 6,
                            "Rows": 1,
                            "ActionType": "none",
                            "Text": `${fixture['5769']} ${fixture['5779']}`,
                            "TextSize": "small",
                            "TextVAlign": "middle",
                            "TextHAlign": "center"
                        },
                        {
                            "Columns": 6,
                            "Rows": 2,
                            "ActionType": "none",
                            "Text": `${ fixture['5780'] }  -  ${fixture['5782']}`,
                            "TextSize": "small",
                            "TextVAlign": "middle",
                            "TextHAlign": "center"
                        },
                        {
                            "ActionBody": "w1", 
                            "Columns": 2,
                            "Rows": 1,
                            "BgColor": "#5c9c14",
                            "Text": "<font color='#ffffff'>W1</font>",
                            "Image": "https://example.com/image_with_button.jpg"
                        },
                        {
                            "ActionBody": "draw", 
                            "Columns": 2,
                            "Rows": 1,
                            "BgColor": "#5c9c14",
                            "Text": "<font color='#ffffff'>Draw</font>",
                            "Image": "https://example.com/image_with_button.jpg"
                        },
                        {
                            "ActionBody": "w2", 
                            "Columns": 2,
                            "Rows": 1,
                            "BgColor": "#5c9c14",
                            "Text": "<font color='#ffffff'>W2</font>",
                            "Image": "https://example.com/image_with_button.jpg"
                        }
                    ]
                }))
            }
        })
        response.send(new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3))
    }else if(message.text === 'match_1'){
        KeyboardConfig.single_match_keyboard.forEach(singleMatch=>{
            response.send(new RichMediaMessage(singleMatch)).then(()=>{
                return response.send(new KeyboardMessage(KeyboardConfig.predict_keyboard, null, null, null, 3));
            }).catch(err => {
                console.error('Error sending messages:', err);
            });
        })
    }else if(message.text === 'back'){
        messageLayout = new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3);
        response.send(messageLayout);
    }else{
        messageLayout = new TextMessage('Constructing!')
        response.send(messageLayout);
    }
});


module.exports = bot;