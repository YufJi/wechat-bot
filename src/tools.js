const dayjs = require('dayjs')
const _ = require('lodash')
const { getWeather, getJoke } = require('./api')

async function genWeather() {
  const day = dayjs().format('YYYY-MM-DD')
  let weather = ''

  try {
    const { data = {} } = await getWeather();
    const { city, realtime = {}, future = [] } = data;
    const cur = _.find(future, o => o.date === day) || {};
    weather = `${day}
${city}今天:
    ${cur.weather}
    ${cur.direct}
当前天气情况:
    温度: ${realtime.temperature}
    湿度: ${realtime.humidity}
    风向: ${realtime.direct}
    风力: ${realtime.power}
    空气质量指数: ${realtime.aqi}`

  } catch (error) {
    console.log(error)
  }
  
  return weather;
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
