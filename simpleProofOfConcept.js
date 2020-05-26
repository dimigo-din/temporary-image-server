const axios = require('axios');

const RUNNING_ADDRESS = 'https://imageserver.dimigo.in/';

const simpleAPI = axios.create({
  baseURL: RUNNING_ADDRESS,
});

const test1 = async (title, expectedStatus) => {
  try {
    const { status } = await simpleAPI.get(`/get?title=${title}`);
    return status === expectedStatus;
  } catch({ response: { status } }) {
    console.log(status);
    return status === expectedStatus;
  }
};

const test2 = async () => {
  const { status } = await simpleAPI.post('/upload', {
    title: 'test',
    url: 'https://github.com/inudevs.png',
  });
  return status === 200;
};

const main = async () => {
  const testOneResult = await test1('hi', 400);
  const testTwoResult = await test2();
  const testThreeResult = await test1('test', 200);

  console.log(testOneResult, testTwoResult, testThreeResult);
  if (testOneResult && testTwoResult && testThreeResult) {
    console.log('✅ Cool!');
  }
};

main();
