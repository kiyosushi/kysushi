// index.js
const WebSocket = require('ws');
const port = process.env.PORT || 3000;

const server = new WebSocket.Server({ port }, () => {
  console.log(`WebSocket server running on port ${port}`);
});

server.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    // 受信メッセージを全クライアントにブロードキャスト
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
