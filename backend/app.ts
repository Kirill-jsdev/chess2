import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { MoveEvent } from "./types";

const app = express();

app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ message: "Server is running", time: new Date().toISOString() });
});

const httpServer = createServer(app);

// Attach Socket.IO to the same HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // allow Vite dev server
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  socket.on("move", (move: MoveEvent) => {
    console.log(move);
    socket.broadcast.emit("receive-move", move);
  });
});

// Start HTTP + WebSocket server
httpServer.listen(3000, () => {
  console.log("Server with Express + Socket.IO running on port 3000");
});
