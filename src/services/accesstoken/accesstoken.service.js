// Initializes the `accesstoken` service on path `/accesstoken`
const createService = require('./accesstoken.class.js');
const hooks = require('./accesstoken.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/accesstoken', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('accesstoken');

  service.hooks(hooks);
};
