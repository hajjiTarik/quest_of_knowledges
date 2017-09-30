var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var io = require('socket.io').listen(http);
var redis = require('./redis');
var config = require('./config');


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

io.sockets.on('connection', function(socket){
  fs.readFile('./data.JSON', 'utf8', function (err,data) {
    if(err) console.log('\x1b[31m','error: ' + err);


    console.log('\x1b[32m','data received with success');
    socket.emit('get data', data);
  });


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
});

http.listen(config.redis.server_port, function(){
  console.log('\x1b[33m%s\x1b[0m','Listening on port ' + config.redis.server_port);
});