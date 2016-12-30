var express = require('express');
var io = require("socket.io")();

var app = express();
var ioApi = {};

io.on("connection", function(socket) {
    console.log("User connected");

    socket.on("disconnect", function() {
        console.log("User disconnected");
    });
});

ioApi.io = io;
ioApi.updateClients = function(tweets) {
    io.emit("update tweets", tweets);
};

module.exports = ioApi;