const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(bodyParser.json());

// Endpoint to receive data from the Pico
app.post('/data', (req, res) => {
    const data = req.body;
    console.log('Data received:', data);
    io.emit('data', data);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});