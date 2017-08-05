'use strict';
var redis = require('redis');
var config = require('./config');
var client = redis.createClient(); //By default, redis.createClient() will use 127.0.0.1 and 6379 as the hostname and port
var uuid = require('node-uuid');
//var async = require('async');
client.on('connect', function(){
  console.log('connected to redis');
});

var exports = module.exports;

exports.checkAwaitingGames = function(socket, callback, dispatcher){
  //console.log('in checkAwaitingGames');
  var foundGame = false;
  client.keys('*', function(err, games){
    console.log(games);
    if(games.length > 0){
      games.forEach(function(game, i){
        //console.log(game);
        if(!foundGame){
          client.hgetall(game, function(err, reply){
            //console.log(reply);
            if(reply.player2 === '' && reply.player1 !== socket.id){
              console.log('found game', reply);
              callback({game: game, found: true, socket: socket});
              foundGame = true;
              dispatcher('player2 found', {player: socket.id}, reply.player1);
            }
            else{
              //console.log('no games found');
              callback({game: '', found: false, socket: socket});
            }
          });



        }
      });
    }
    else
    {
      //console.log('there are no games');
      callback({game: '', found: false, socket: socket});
    }
  });
};

exports.assignGame = function(game, socketid, dispatcher){
  //console.log('in assign', game);
  client.hgetall(game, function(err, reply){
    if(err){
      exports.createGame(socketid);
      console.log('error assigning to game');
    }
    reply.player2 = socketid;
    client.hmset(game, reply);
    var message = {
      name: game,
      player: 'player2'
    };
    dispatcher('game', message, socketid);
  });
};

exports.createGame = function(sessionId, dispatcher){
  //console.log('in create game');
  var uuid1 = uuid.v4();
  var game = config.redis_root_key+uuid1;
  client.hmset(game, {
    'player1': sessionId,
    'player2': ''
  });

  var message = {
    name: game,
    player: 'player1'
  };
  console.log('message set in createGame');
  dispatcher('game',message, sessionId);
};

exports.closeGame = function(sessionid, dispatcher){
  client.keys('*', function(err, games){
    games.forEach(function(game, i){
      client.hgetall(game, function(err, reply){
        if(reply.player1 === sessionid){
          client.del(game);
        }
        if(reply.player2 ===sessionid){
          dispatcher('player offline', {player: sessionid}, reply.player1);
        }
      });
    });
  });
};

exports.sendReponse = function(obj,  dispatcher){
  client.hgetall(obj.name, function(err, found){
    console.log("toto", found);
    if(obj.player ==='player1'){
      dispatcher('answer',obj, found.player2);
    }
    else{
      dispatcher('answer',obj, found.player1);
    }
  });
};
