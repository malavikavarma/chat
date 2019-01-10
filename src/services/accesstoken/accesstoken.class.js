/* eslint-disable no-unused-vars */
const axios = require('axios');
const jwt = require('jsonwebtoken');

const DBInsertion = data => {
  axios
    .post('http://localhost:3030/users', {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      picurl: data.picture.data.url
    })
    .then(result => result)
    .catch(error => error.message);
};

class Service {
  constructor(options) {
    this.options = options || {};
  }
  async find(params) {
    return axios
      .get(
        `https://graph.facebook.com/me?fields=id,first_name,last_name,picture{url},email&access_token=${
          params.query.token
        }`
      )
      .then(({ data }) => {
        DBInsertion(data);
        const token = jwt.sign({ user_id: data.id }, 'skey');
        return Promise.resolve([
          {
            token
          }
        ]);
      })
      .catch(error => error.message);
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
