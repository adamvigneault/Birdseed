var express = require('express');
var io = require("socket.io")();

var app = express();

io.on("connection", function(socket) {
    console.log("User connected");

    socket.on("disconnect", function() {
        console.log("User disconnected");
    });
});

var ioApi = {
    io : io,
    updateClients : function(tweets) {
        io.emit("update tweets", tweets);
    },
    updateProfile : function(profile) {
        io.emit("update profile", profile);
    }
};

module.exports = ioApi;