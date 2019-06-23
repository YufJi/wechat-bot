const axios = require('axios')

module.exports = function request({ url, params, method }) {
  return axios({
    method: method || 'get',
    url,
    data: params,
    params,
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      data = JSON.parse(data);
      const { error_code, result, reason } = data;
      if(error_code === 0) {
        return result;
      } else {
        throw new Error(reason);
      }
    }],
  });
}