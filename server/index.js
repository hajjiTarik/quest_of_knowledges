var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var path = require('path');
var uuid = require('node-uuid');
var redis = require('./redis');
var config = require('./config');
var requester = require('./requester');

app.use(express.static('www'));
app.use(express.static('bower_components'));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + 'www/index.html'));
});

var dispatcher = function(type, obj, toId){
  io.sockets.to(toId).emit(type, obj);
};

var associateGame = function(obj){
  if(obj.found){
    redis.assignGame(obj.game, obj.socket.id, dispatcher);
  }else{
    redis.createGame(obj.socket.id, dispatcher);
  }
};

var options = {
  host: 'opentdb.com',
  port: 443,
  path: '/api.php?amount=10&category=9&type=multiple',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
var res = [];

requester.getJSON(options,function(statusCode, result) {
  console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
  res = result;
});
io.sockets.on('connection', function(socket){
  socket.emit('get data', res);

  redis.checkAwaitingGames(socket, associateGame, dispatcher);

  socket.on('disconnect', function(){
    redis.closeGame(socket.id, dispatcher);
    console.log('user disconnected');
  });

  socket.on('chat message', function(message){
    socket.emit('chat message',message);
    console.log('message: ' + message);
  });

  socket.on('answer', function(obj){
    console.log('response answers', obj);
    redis.getPlayerAnswers(obj, dispatcher);
  });

  socket.on('send settings', function(response){
    console.log("tototototto", response);
  })
});

http.listen(config.server_port, function(){
  console.log('Listening on port ' + config.server_port);
});