//Load HTTP module
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

//Websockets
const express = require("express");
const WebSocket = require('ws');
const app = express();

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



const wss = new WebSocket.Server({
    server: server
});

wss.on('connection', function connection(ws) {
    console.log('A new client connected');
    ws.send('Welcome new client');

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        ws.send('Got your msg, its:' + message);
    });

    ws.send('something');
});





app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});