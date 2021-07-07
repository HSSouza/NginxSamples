import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app_name = process.env.app;
const hostname = process.env.hostname;
const port = process.env.port || 3000;


const app = express();

// app.use(express.static("./public"));

 app.get("/api/status", (req, res) => {
     res.sendStatus(200).end();
 })

app.get("/api/info", (req, res) => {
    res.status(200).send({
        app: app_name,
        hostname: hostname,
        port:port
    }).end();
})


const httpServer = createServer(app);
const io = new Server(httpServer, {
  // socket.io options...
});

io.on("connection", (socket) => {
    socket.on("heartbeat", (payload) => {
        // console.log("heartbeat", socket.id);
        socket.emit("heartbeat", payload)
    })
});


httpServer.listen(process.env.port || 3000, () => {
    console.log(`Server is listening on ${port}`);
})