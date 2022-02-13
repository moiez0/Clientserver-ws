'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    console.log('recieved: %s', message);
    ws.send(message);
  });
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

