const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error')
dotenv.config({ path: './config/config.env' });
const connectionHandler = require('./socket/connectionHandler');



const userRoutes = require('./routes/users');

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use(errorHandler);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', connectionHandler);


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
