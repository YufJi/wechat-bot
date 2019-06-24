const dayjs = require('dayjs')
const _ = require('lodash')
const { getWeather, getJoke } = require('./api')

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

    weather = `${city}当前
${tem}
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


function isJoke(text) {
  const jokes = ['笑话', '不开心', '难过', '伤心']
  let flag = false
  for (let i = 0; i < jokes.length; i++) {
    const element = jokes[i];
    if (text.indexOf(element) > -1) {
      flag = true;
      break;
    }
  }
  return flag;
}

async function genJoke() {
  try {
    const { data = {} } = await getJoke();
    return data
  } catch (err) {
    console.log(err)
  }
}



module.exports = {
  genWeather: genWeather,
  isJoke: isJoke,
  genJoke: genJoke,
}
