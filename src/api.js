const request = require('./service')
const { key } = require('./config')

function getWeather(city) {
  return request({
    url: 'http://apis.juhe.cn/simpleWeather/query',
    params: {
      city: city ||'杭州',
      key: key.weather
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

module.exports = {
  getWeather: getWeather,
  getJoke: getJoke
}