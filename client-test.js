(async () => {
  const axios = require('axios')
  const baseUrl = "http://localhost:3000/counter";

  const res = await axios.get(baseUrl)
  console.log('res.data', res.data);

  const res1 = await axios.post(`${baseUrl}?add=10`);
  console.log('res.data', res1.data);

  const res2 = await axios.get(baseUrl)
  console.log('res.data', res2.data);

})();
