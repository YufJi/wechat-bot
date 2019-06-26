const dayjs = require('dayjs')
const _ = require('lodash')
const { getWeather, getJoke, getHuangli, getTodayOnhistory, getLaji } = require('./api')
const { regtianqi } = require('./regexp')

async function genWeather(provience, city) {
  provience = provience || '上海';
  city = city || '上海';
  const day = dayjs().format('YYYY-MM-DD')
  let weather = ''

  try {
    const { data = {} } = await getWeather(provience, city);
    const {
      tem,
      status,
      humidity,
      wind,
      wea_alert,
      tips,
      live_index
    } = data;

    weather = `${tem}
${status}
${humidity}
${wind}
${wea_alert}
${tips}

${live_index}`

  } catch (error) {
    console.log(error)
    weather = 'ps: 获取数据失败'
  }
  
  return weather.replace('天气', '');
}


async function genJoke() {
  try {
    const { data = {} } = await getJoke();
    return data;
  } catch (err) {
    console.log(err)
  }
}

async function genHuangli(date) {
  let haungli = '';
  try {
    const { data = {} } = await getHuangli(date)
    const map = {
      'yangli': '阳历',
      'yinli': '阴历',
      'wuxing': '五行',
      'chongsha': '冲煞',
      'baiji': '拜祭',
      'jishen': '吉升',
      'yi': '宜',
      'xiongshen': '凶神',
      'ji': '忌'
    };
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const element = map[key];
        haungli+= `${element}: ${data[key]} \n`
      }
    }
  } catch (err) {
    console.log(err);
    haungli = 'ps: 获取数据失败'
  }
  return haungli;
}


async function genTodayOnhistory(date) {
  let str = '';
  try {
    const { data } = await getTodayOnhistory(date);
    const len = data.length > 10 ? 10 : data.length;
    for (let i = 0; i < len; i+=1) {
      const element = data[i];
      str += `· ${element.date} ${element.title}\n`
    }
  } catch (error) {
    console.log(error)
    str = 'ps: 获取数据失败'
  }
  return str;
}

async function genLaji(name) {
  let str = ''
  try {
    const { data } = await getLaji(name)
    str = data;
  } catch (error) {
    console.log(error);
    str = 'ps: 获取数据失败'
  }
  return str;
}


module.exports = {
  genWeather: genWeather,
  genJoke: genJoke,
  genHuangli: genHuangli,
  genTodayOnhistory: genTodayOnhistory,
  genLaji: genLaji,
}
