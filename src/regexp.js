
const tianqi = /([\w\W]*)(天气|气温|温度)([\w\W]*)/ig;

const joke = /([\w\W]*)(笑话|不开心|难过|伤心)([\w\W]*)/ig;

const huangli = /([\w\W]*)(黄历)([\w\W]*)/ig;

const historyToday = /([\w\W]*)(历史上的今天|历史今天|历史的今天)([\w\W]*)/ig;

module.exports = {
  regtianqi: tianqi,
  regjoke: joke,
  reghuangli: huangli,
  historyToday: historyToday,
}