// Simple WebSocket broadcast util. The ESP32 can connect using ws://<host>/ws
// Clients (frontends) also subscribe to the same endpoint to receive live telemetry.

let wssGlobal = null;

function init(wss) {
  wssGlobal = wss;
  wss.on('connection', (ws, req) => {
    console.log('WS client connected');
    ws.on('message', (msg) => {
      try {
        const payload = JSON.parse(msg);
        // Broadcast incoming sensor packets to all non-source clients
        broadcast(JSON.stringify({ type: 'telemetry', data: payload }), ws);
      } catch (e) {
        console.warn('Invalid WS msg', e.message);
      }
    });
    ws.on('close', () => console.log('WS client disconnected'));
  });
}

function broadcast(data, skip) {
  if (!wssGlobal) return;
  wssGlobal.clients.forEach(client => {
    if (client !== skip && client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

module.exports = { init, broadcast };
