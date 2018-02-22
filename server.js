var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);
var history = new Array();

app.use(express.static('client'));

var io = require('socket.io')(server);

io.on('connection', function (socket) {
        socket.emit('history', history);
        socket.on('message', function (msg) {
        io.emit('message', `${msg.initials}: ${msg.message}`);
        history.push(`${msg.initials}: ${msg.message}`);
        });
    });

    server.listen(8080, function() {
        console.log('Chat server running');
})