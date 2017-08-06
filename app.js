var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var path = require('path');
var uuid = require('node-uuid');
var redis = require('./server/redis');
var config = require('./server/config');

app.use(express.static('www'));
app.use(express.static('bower_components'));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + 'www/index.html'));
});

//dispatcher isn't working. Nothing recieved in client.
var dispatcher = function(type, obj, toid){
  console.log(toid);
  io.sockets.to(toid).emit(type, obj);
};

var associateGame = function(obj){
  if(obj.found){
    redis.assignGame(obj.game, obj.socket.id, dispatcher);
  }else{
    redis.createGame(obj.socket.id, dispatcher);
  }
};

io.sockets.on('connection', function(socket){
  redis.checkAwaitingGames(socket, associateGame, dispatcher);

  socket.on('disconnect', function(){
    redis.closeGame(socket.id, dispatcher);
    console.log('user disconnected');
  });

  socket.on('chat message', function(message){
    socket.emit('chat message',message);
    console.log('message: ' + message);
  });

  socket.on('move', function(obj){
    console.log('move players', obj);
    redis.checkOpponent(obj, dispatcher);
  });

  socket.on('answer', function(obj){
    console.log('response answers', obj);
    redis.getPlayerAnswers(obj, dispatcher);
  });
});

http.listen(config.server_port, function(){
  console.log('Listening on port ' + config.server_port);
});