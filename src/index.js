const { Wechaty, UrlLink, FileBox } = require('wechaty');
const opn = require('chrome-opn');
const schedule = require('node-schedule');
const dayjs = require('dayjs')
const { genWeather, genJoke, genHuangli } = require('./tools');
const { testNickName, testTopic, xuhaoqi } = require('./config');

const { regtianqi, regjoke, reghuangli } = require('./regexp')

const { resolve } = require('path')

let jokes = [];
 
const wechaty = new Wechaty({
  name: 'bot_13',
  // puppet: 'wechaty-puppet-padchat',
});

try {
  wechaty.on('scan', (qrcode, status) => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`
    console.log(`Scan QR Code to login: ${status}\n ${url}`)
    opn(url);
  })
  wechaty.on('login', async user => {
    console.log(`User ${user} logined`)
  })
} catch (error) {
  console.log(error, '检查是不是已经登录了')
}

wechaty.on('message', async msg => {
  const room = msg.room();
  const text = msg.text();
  const contact = msg.from();
  
  if (room) {
    const topic = await room.topic();
    const isMention = await msg.mentionSelf();
    if (testTopic.includes(topic) && isMention) {
      await talk(text, contact, room);
    }
  } else {
    const nickname = (await contact.alias()) || contact.name();
    if (testNickName.includes(nickname)) {
      await talk(text, contact, room);
    }
  }
})

async function start() {
  
  await wechaty.start();

  const hh = await wechaty.Contact.find({ alias: xuhaoqi })
  const job = schedule.scheduleJob('13 30 7 * * *', () => {
    talk('天气', hh, null)
  });
}

start()

async function talk(text, contact, room) {
  const real = room ? room : contact;
  if(regtianqi.test(text)) {
    let province  = (contact.province() || '').toLowerCase();
    let city = (contact.city() || '').toLowerCase();
    const provinces = ['beijing', 'shanghai', 'chongqing', 'tianjin', 'xianggang', 'aomen', 'taiwan'];
    if (provinces.includes(province)) {
      city = province;
    }
    let weather = await genWeather(province, city);
    let str = `${weather}`
    await real.say(str)//发送消息
  }
  if(regjoke.test(text)) {
    if(jokes.length === 0) {
      jokes = await genJoke();
    }
    const joke = jokes.pop();
    let str = `${joke.content}`
    await real.say(str)//发送消息
  }
  if(reghuangli.test(text)) {
    const today = dayjs().format('YYYY-MM-DD')
    const str = await genHuangli(today);
    await real.say(str)
  }
}

 


