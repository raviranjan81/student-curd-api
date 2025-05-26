import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import connectDB from './config/db.js'
import StudentRouter from './routes/student.route.js'

const app = express()
const server = http.createServer(app); // ✅ Socket.IO will attach to this
const io = new Server(server, {
  cors: {
    origin: "*", // change this to specific domains in production
    methods: ["GET", "POST"]
  }
});

connectDB()

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) // Use CORS for REST API routes

// REST API
app.use('/api/v1/students', StudentRouter);
const router = express.Router()
// WebSocket
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("send-message", (data) => {
    console.log("📩 Message received:", data);
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});



// ✅ START SERVER with WebSocket attached
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
