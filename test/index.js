const { getWeather, getJoke } = require('../src/api')

const { genWeather, genJoke, genHuangli, genTodayOnhistory } = require('../src/tools')

const dayjs = require('dayjs')


async function test(ci) {
  const {data} = await getWeather(ci);
  console.log(data)
}

// test('上海');


genHuangli('2019-06-26').then((data) => {
  // console.log(data)
})

console.log(dayjs().format('M/D'));

genTodayOnhistory(dayjs().format('M/D')).then(data => {
  // console.log(data)
})