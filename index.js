const config = require('app/config');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const loop = require('app/loop');
const board = require('app/board');

app.use('/static', express.static(`${__dirname}/static`));
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

io.on('connection', async function () {
    io.emit('board', await board.get());
});

(async function nextTick() {
    io.emit('state', await loop.nextTick());
    setTimeout(nextTick, config.loopTimeout);
})();

http.listen(3000);

process.on('unhandledRejection', err => console.error(err.stack));
