"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = 3000;
const io = new socket_io_1.Server(server);
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/views/index.html"));
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
