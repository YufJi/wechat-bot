const { genWeather, genJoke } = require('../src/tools')

async function test(ci) {
  // const data = await genWeather(ci);
  const joke = await genJoke();
  // console.log(joke)
}

test('上海');