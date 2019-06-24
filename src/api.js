const request = require('./service')
const { key } = require('./config')

function getWeather(provience, city) {
  // return request({
  //   url: 'http://v.juhe.cn/weather/index',
  //   params: {
  //     cityname: city ||'杭州',
  //     key: key.weather
  //   }
  // })
  return request({
    url: 'http://localhost:8888/weather',
    params: {
      provience: provience,
      city: city
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