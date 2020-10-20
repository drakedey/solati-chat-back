const { getValueFromTo } = require('../controllers/currency');
const { ON_REQUEST_MESSAGE } = require('./constants');

const connectionHandler = (socket) => {
  console.log('CLIENT CONNECTED');

  socket.on(ON_REQUEST_MESSAGE, async (data) => {
    const { value, username } = data;

    const conversionData = await getValueFromTo(value, username);

    socket.emit('REQUEST_MESSAGE_RESPONSE', { data, conversionData });
  });
}

module.exports = connectionHandler;
