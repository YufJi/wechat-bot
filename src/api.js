const request = require('./service')
const { key } = require('./config')

function getWeather(provience, city) {
  return request({
    url: 'http://localhost:8888/weather',
    params: {
      provience: provience,
      city: city
    }
  })
}

function getLaji(name) {
  return request({
    url: 'http://localhost:8888/laji',
    params: {
      name
    }
  })
}

function getJoke() {
  return request({
    url: 'http://v.juhe.cn/joke/randJoke.php',
    params: {
      key: key.joke
    }
  })
}

function getHuangli(date) {
  return request({
    url: 'http://v.juhe.cn/laohuangli/d',
    params: {
      key: key.huangli,
      date
    }
  })
}

function getTodayOnhistory(date) {
  return request({
    url: 'http://v.juhe.cn/todayOnhistory/queryEvent.php',
    params: {
      key: key.todayOnhistory,
      date,
    }
  })
}

module.exports = {
  getWeather: getWeather,
  getJoke: getJoke,
  getHuangli: getHuangli,
  getTodayOnhistory: getTodayOnhistory,
  getLaji: getLaji,
}