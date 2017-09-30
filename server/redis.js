'use strict';
var redis = require('redis');
var config = require('./config');
var client = redis.createClient();
var uuid = require('node-uuid');

client.on('connect', function () {
  console.log('connected to redis');
});

module.exports = {
  checkAwaitingGames: function (socket, callback, dispatcher) {
    var foundGame = false;
    client.keys('*', function (err, games) {
      if (games.length > 0) {
        games.forEach(function (game, i) {
          if (!foundGame) {
            client.hgetall(game, function (err, reply) {
              console.log(reply.player1);
              if (reply.player2 === '' && reply.player1 !== socket.id) {
                console.log('found game', reply);
                callback({ game: game, found: true, socket: socket });
                foundGame = true;
                dispatcher('player2 found', { player: socket.id }, reply.player1);
              }
              else {
                callback({ game: '', found: false, socket: socket });
              }
            });
          }
        });
      }
      else {
        callback({ game: '', found: false, socket: socket });
      }
    });
  },

  assignGame: function (game, socketId, dispatcher) {
    client.hgetall(game, function (err, reply) {
      if (err) {
        exports.createGame(socketId);
        console.log('error assigning to game');
      }
      reply.player2 = socketId;
      client.hmset(game, reply);
      var message = {
        name: game,
        player: 'player2'
      };
      dispatcher('game', message, socketId);
    });
  },

  createGame: function (sessionId, dispatcher) {
    //console.log('in create game');
    var uuid1 = uuid.v4();
    var game = config.redis.redis_root_key + uuid1;
    client.hmset(game, {
      'player1': sessionId,
      'player2': ''
    });

    var message = {
      name: game,
      player: 'player1'
    };
    console.log('message set in createGame');
    dispatcher('game', message, sessionId);
  },

  closeGame: function (sessionId, dispatcher) {
    client.keys('*', function (err, games) {
      games.forEach(function (game, i) {
        client.hgetall(game, function (err, reply) {
          if (reply.player1 === sessionId) {
            client.del(game);
          }
          if (reply.player2 === sessionId) {
            dispatcher('player offline', { player: sessionId }, reply.player1);
          }
        });
      });
    });
  },

  getPlayerAnswers: function (obj, dispatcher) {
    client.hgetall(obj.name, function (err, found) {
      console.log('getPlayerAnswers', found);
      if (obj.player === 'player1') {
        dispatcher('answer', obj, found.player2);
      }
      else {
        dispatcher('answer', obj, found.player1);
      }
    });
  }
}
