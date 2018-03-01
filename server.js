var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);
var history = new Array();


const mongoose = require('mongoose'); 

const Message = require('./models/message');

app.use(express.static('client'));

var io = require('socket.io')(server);

// mongodb connection
mongoose.connect("mongodb://localhost:27017/chatapp");
const db = mongoose.connection;

//db error
db.on('error', () => {
    console.error('mongo connection error!');
  });


io.on('connection', function (socket) {
        socket.emit('history', history);
        socket.on('message', function (msg) {
        Message.create(msg);
        io.emit('message', `${msg.initials}: ${msg.message}`);
          history.push(`${msg.initials}: ${msg.message}`);
        });
    });

    server.listen(8080, function() {
        console.log('Chat server running');
})