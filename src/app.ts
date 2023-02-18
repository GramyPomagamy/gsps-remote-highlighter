import express, { Express, Request, Response } from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app: Express = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

io.on("connection", (socket) => {
  console.log("New socket connection");

  socket.on("disconnect", () => {
    console.log("Socket connection ended");
  });

  socket.on("highlight", () => {
    console.log("emitting highlight");
    io.emit("highlight");
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
