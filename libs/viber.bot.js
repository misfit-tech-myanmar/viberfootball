const { Bot, Message } = require('viber-bot');
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
require('dotenv').config();
const aixosInstance = require('./axios.instance');
const KeyboardConfig = require('../configs/bot.keyboerd.json');
const RichMediaMessage = require('viber-bot').Message.RichMedia;

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
bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>
	onFinish(new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3)));
bot.on(BotEvents.MESSAGE_RECEIVED, async(message, response) => {
    const userProfile = response.userProfile;
    console.log(userProfile)
    // await aixosInstance.post('/users', {
    //     id: user.id,
    //     name: user.name,
    //     avatar: user.avatar,
    //     country: user.country,
    //     language: user.language,
    //     scores: 0
    // })
    
    let messageLayout;
    if(message.text === "hi"){
        messageLayout = new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3);
        bot.sendMessage(messageLayout);
    }else if(message.text === 'predict'){
        messageLayout =  new KeyboardMessage(KeyboardConfig.predict_keyboard, null, null, null, 3);
        response.send(messageLayout);
    }else if(message.text === 'match_1'){
        response.send(new RichMediaMessage(KeyboardConfig.single_match_keyboard)).then(()=>{
            return response.send(new KeyboardMessage(KeyboardConfig.predict_keyboard, null, null, null, 3));
        }).catch(err => {
            console.error('Error sending messages:', err);
        });
    }else if(message.text === 'back'){
        messageLayout = new KeyboardMessage(KeyboardConfig.main_keyboard, null, null, null, 3);
        response.send(messageLayout);
    }else{
        messageLayout = new TextMessage('Constructing!')
        response.send(messageLayout);
    }
});


module.exports = bot;