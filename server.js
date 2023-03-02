import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { Socket } from "socket.io-client";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const PORT = "4000";

app.use(cors(PORT));
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(`usuario ${socket.id} conectado`);
  socket.on("message", (message) => {
    console.log(socket.id + "Mensaje :" + message);
    socket.broadcast.emit("messageAllUser", {
      body: message,
      from: socket.id,
    });
  });
});

server.listen(PORT);
console.log("Server started", PORT);
