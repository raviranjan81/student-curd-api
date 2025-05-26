import WebSocket, { WebSocketServer } from 'ws';

let esp32Clients = [];

export const setupESP32WebSocket = (server) => {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    if (request.url === '/esp32') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    console.log('🔌 ESP32 Connected');
    esp32Clients.push(ws);

    ws.on('close', () => {
      console.log('❌ ESP32 Disconnected');
      esp32Clients = esp32Clients.filter((client) => client !== ws);
    });
  });
};

export const sendToggleUpdateToESP32 = (data) => {
  const message = JSON.stringify(data);
  esp32Clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
