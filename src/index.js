const { Wechaty, Room } = require('wechaty') // import { Wechaty } from 'wechaty'
const opn = require('chrome-opn')
const { genWeather, isJoke, genJoke } = require('./tools')
const { testNickName, testTopic } = require('./config')

let jokes = [];
 
const wechaty = new Wechaty({
  name: 'bot_13',
  puppet: 'wechaty-puppet-wechat4u',
});

try {
  wechaty.on('scan', (qrcode, status) => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`
    console.log(`Scan QR Code to login: ${status}\n ${url}`)
    opn(url);

  })
  wechaty.on('login', user => console.log(`User ${user} logined`))
} catch (error) {
  console.log(error, '检查是不是已经登录了')
}
wechaty.on('message', async msg => {
  const room = msg.room();
  const text = msg.text();
  const contact = msg.from();
  if (room) {
    const topic = await room.topic();
    if (testTopic.includes(topic)) {
      await talk(text, contact, room)
    }
   
  } else {
    const nickname = (await contact.alias()) || contact.name();
    if (testNickName.includes(nickname)) {
      await talk(text, contact, room)
    }
  }
})

async function start() {
  await wechaty.start();
}

start()


async function talk(text, contact, room) {
  const city = contact.city();
  if (room) {
    contact = room;
  }
  if(text.indexOf('天气') > -1) {
    let weather = await genWeather(city);
    let str = `${weather}
    -----来自 Yuf_bot`
    await contact.say(str)//发送消息
  }
  if(isJoke(text)) {
    if(jokes.length === 0) {
      jokes = await genJoke();
    }
    const joke = jokes.pop();
    let str = `${joke.content}
    -----来自 Yuf_bot`
    await contact.say(str)//发送消息
  }
}

 


