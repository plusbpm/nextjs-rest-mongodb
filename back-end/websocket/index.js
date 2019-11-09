const SocketIOServer = require('socket.io');
const { parse } = require('cookie');
const get = require('lodash/get');

const { session } = require('../modules');

const wsRoot = process.env.WEBSOCKET_ROOT;

let io = null;

const init = async fastify => {
  const { dbAdapter } = fastify;

  if (io) return;

  io = new SocketIOServer(fastify.server, {
    cookie: false,
    cookiePath: false,
    path: wsRoot,
    serveClient: false,
  });

  io.on('connection', async socket => {
    const { sid } = parse(get(socket, 'handshake.headers.cookie', ''));

    if (!sid) {
      socket.disconnect(true);
      return;
    }
    const sessionDoc = await session.find(dbAdapter, sid);
    if (!sessionDoc) {
      socket.disconnect(true);
      return;
    }
    const { userId } = sessionDoc;

    socket.join(userId);
  });
};

const send = (userId, eventName, data) => {
  io.to(userId).emit(eventName, data || {});
};

module.exports = { init, send };
