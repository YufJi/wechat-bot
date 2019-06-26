const { getWeather, getJoke } = require('../src/api')

const { genWeather, genJoke, genHuangli } = require('../src/tools')


async function test(ci) {
  const {data} = await getWeather(ci);
  console.log(data)
}

// test('上海');


genHuangli('2019-06-26').then((data) => {
  console.log(data)
})