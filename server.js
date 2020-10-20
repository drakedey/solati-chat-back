const app = require('express')();
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const { getValueFromTo } = require('./controllers/currency')


const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('CLIENT CONNECTED');

  socket.on('REQUEST_MESSAGE', async (data) => {
    const { value } = data;

    const conversionData = await getValueFromTo(value);

    socket.emit('REQUEST_MESSAGE_RESPONSE', { data, conversionData });
  })

});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
