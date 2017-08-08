(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('initializeGameService', function ($log, qkConstantes, utils, $rootScope, persistFetchedResults,routerHelper, socketIO,getQuestionAnswersService) {
      function init () {
        var playersSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');
        if(_.isEmpty(playersSettings)){
          persistFetchedResults.setItem('PLAYER_SETTINGS',{ activatedLevels: 1 });
        }
      }
      function isFirstTime() {
        var gameSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');
        console.log(gameSettings.name);
        if(gameSettings.name){
          routerHelper.goToState('home');
        }
      }

      function initServer() {
        var playersSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');
        var list = [];
        socketIO.on('chat message', function (msg) {
          list.push(msg);
        });

        socketIO.on('game', function (game) {
          $rootScope.game = game;
        });

        socketIO.on('player2 found', function(obj){
          console.log('player2 found',obj);
          $rootScope.player2Found = true;
        });
        socketIO.emit('change name', {response:playersSettings.name || 'unknown', player: $rootScope.game.player, game: $rootScope.game.name});

        socketIO.on('get data', function(res){
          getQuestionAnswersService.fetchQuestionsAnswers(res);
        })

      }

      return {
        isFirstTime: isFirstTime,
        init: init,
        initServer: initServer
      };
    });
}());