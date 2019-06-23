const request = require('./service')

function getWeather(city) {
  return request({
    url: 'http://apis.juhe.cn/simpleWeather/query',
    params: {
      city: city ||'杭州',
      key: '1ca41fdacadb25b46dbfd506f11e7319'
    }
  })
}

function getJoke() {
  return request({
    url: 'http://v.juhe.cn/joke/randJoke.php',
    params: {
      key: '4d85ab9b31ddd919155fc83ae2d2706a'
    }
  })
}

module.exports = {
  getWeather: getWeather,
  getJoke: getJoke
}