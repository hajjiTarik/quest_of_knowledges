(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('initializeGameService', function ($log, qkConstantes, utils, $rootScope, persistFetchedResults,routerHelper) {
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

      return {
        isFirstTime: isFirstTime,
        init: init
      };
    });
}());