/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
var cookieParser = require('socket.io-cookie');
const jwt = require('jsonwebtoken');
let id;
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
);

app.io.use(cookieParser);
app.io.on('connection', function(client) {
  if (
    client.handshake.headers.cookie &&
    client.handshake.headers.cookie.token
  ) {
    try {
      const decode = jwt.verify(client.handshake.headers.cookie.token, 'skey');
      id = decode.user_id;
      client.join('all');
      client.join(id);
      // client.on('newmsg', msg => {
      //   app.io.to(id).emit('newmsg', msg);
      // });
      app.io.in(id).clients((err, clients) => {
        if (clients.length === 1)
          app.io.to('all').emit('useronline', { userID: id });
      });
    } catch (err) {
      throw new Error('Please login using Facebook');
    }
  }
  client.on('disconnect', () => {
    app.io.in(id).clients((err, clients) => {
      // console.log(clients.length);
      if (clients.length === 0)
        app.io.to('all').emit('useroffline', { userID: id });
    });
  });
});
