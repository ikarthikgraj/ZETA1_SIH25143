require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const pressureRoutes = require('./routes/pressureRoutes');
const patientRoutes = require('./routes/patientRoutes');
const websocketUtil = require('./utils/websocket');

const PORT = process.env.PORT || 5000;
const WS_PORT = process.env.WEBSOCKET_PORT || 5050;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pressure', pressureRoutes);
app.use('/api/patients', patientRoutes);

// Health
app.get('/api/health', (req, res) => res.json({status: 'ok'}));

const server = http.createServer(app);

// WebSocket server for real-time telemetry
const wss = new WebSocket.Server({ server, path: '/ws' });
websocketUtil.init(wss);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { });
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`HTTP server running on ${PORT}`));
  } catch (err) {
    console.error('Startup error', err);
    process.exit(1);
  }
}

start();
