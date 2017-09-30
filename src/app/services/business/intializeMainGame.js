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
        $rootScope.player2Found = false;
        var playersSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');
        var list = [];
        socketIO.on('chat message', function (msg) {
          list.push(msg);
        });
        socketIO.on('game', function (game) {
          console.log('game', game);
          $rootScope.game = game;
        });

        socketIO.on('player2 found', function(obj){
          console.log('player2 found',obj);
          $rootScope.player2Found = obj;
        });

        $rootScope.$watch('game', function(newValueOfGame){
          console.log("newValueOfGame", newValueOfGame);
          if(newValueOfGame){
            if(newValueOfGame.player && newValueOfGame.name){
              console.log("player :", newValueOfGame.player);
              socketIO.emit('send settings', {
                response: playersSettings,
                player: newValueOfGame.player,
                game: newValueOfGame.name
              });
            }
          }else{
            console.warn('waiting for response...');
          }
        })

        socketIO.on('get data', function(res){
          getQuestionAnswersService.fetchQuestionsAnswers(JSON.parse(res));
        })

      }

      return {
        isFirstTime: isFirstTime,
        init: init,
        initServer: initServer
      };
    });
}());