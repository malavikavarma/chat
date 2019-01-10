const axios = require('axios');
const errorHandler = require('../../hooks/error');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        return axios
          .get(`http://localhost:3030/users/${context.data.id}`)
          .then(result => {
            context.result = result.data;
            return context;
          })
          .catch(() => {
            context.app.io.to('all').emit('message', 'new user created');
            return context;
          });
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async function(context) {
        const isUserOnline = id => {
          return new Promise(resolve => {
            context.app.io.in(id).clients((err, clients) => {
              if (clients.length) return resolve(true);
              return resolve(false);
            });
          });
        };
        const getUsers = users => {
          return Promise.all(
            users.map(async user => {
              const newUser = user;
              newUser.online = await isUserOnline(user.id);
              return newUser;
            })
          );
        };
        const newContext = context;
        newContext.result.data = await getUsers(context.result.data);
        return newContext;
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [errorHandler],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
