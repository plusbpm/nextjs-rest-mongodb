import io from 'socket.io-client';
import get from 'lodash/get';
import forIn from 'lodash/forIn';

const wsRoot = process.env.WEBSOCKET_ROOT;

let socket;

const makeFlushHandler = restClient => () => {
  forIn(restClient.getInqueriesMap(), inquery => {
    if (get(inquery, 'options.refetchOnReconnect')) inquery.resend();
  });
};

export default restClient => {
  const userId = restClient.getInquery('user').get('data._id');
  if (!userId || !process.browser) return undefined;
  if (socket && socket.userId === userId) return socket;
  if (socket && socket.connected) socket.disconnect();

  socket = io({ path: wsRoot });
  socket.userId = userId;

  const flush = makeFlushHandler(restClient);
  socket.on('reconnect', flush);
  socket.on('flush', flush);

  return socket;
};
