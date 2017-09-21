/**
 * CONTROLLER : page videos
 */
(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .controller('gameController', GameControllerFct);


  function GameControllerFct(persistFetchedResults, $ionicSlideBoxDelegate,routerHelper,qkConstantes, socketIO, $rootScope, $timeout){

    var vm = this;
    var numQuestions = 1;

    // ############## PRIVATE BUSINESS ############# //
    /**
     * init of the controler
     */
    vm.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    function win(){

    }
    socketIO.on('player offline', function(){
      win();
    });

    socketIO.on('answer', function(obj){
      vm.opAnswer = obj.response;
      $ionicSlideBoxDelegate.slide(numQuestions++);
    });

    vm.checkResponse = function(response, correctResponse){
      if(response !== correctResponse) return false;
      $ionicSlideBoxDelegate.slide(numQuestions++);
      if(numQuestions === qkConstantes.api.nbQuestionsPerLevel){
        routerHelper.goToState('levels');
      }
      socketIO.emit('answer',{response: correctResponse, player: $rootScope.game.player, name: $rootScope.game.name});
    }

    function init(){
      console.log($rootScope.game.player);
      vm.answers = persistFetchedResults.getItem('ACTIVE_LEVEL');
      try{
        vm.player2Found = $rootScope.game.player === 'player1' ? $rootScope.player2Found : true;
      }catch(e){
        console.warn(e);
        vm.showError = true;
        $timeout(function(){
          vm.showError = false;
          routerHelper.goToState('home');
        },2000);

      }
    }
    // ################# INITALIZE ################# //

    init();
  }
})();
