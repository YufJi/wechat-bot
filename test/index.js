const { genWeather, genJoke } = require('../src/tools')
const { getWeather, getJoke } = require('../src/api')

async function test(ci) {
  const {data} = await getWeather(ci);
  console.log(data)
}

test('上海');