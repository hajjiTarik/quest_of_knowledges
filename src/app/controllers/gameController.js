/**
 * CONTROLLER : page videos
 */
(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .controller('gameController', GameControllerFct);


  function GameControllerFct(persistFetchedResults, $ionicSlideBoxDelegate,routerHelper,qkConstantes, socketIO,  $scope, $rootScope){

    var vm = this;
    var numQuestions = 1;

    // ############## PRIVATE BUSINESS ############# //
    /**
     * init of the controler
     */
    vm.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };


    socketIO.on('player offline', function(){
      console.log('player offline');
      if(vm.game.player ==='player1'){
        vm.player2Found = false;
      }
      vm.myturn = false;
      $scope.$apply();
    });

    socketIO.on('answer', function(obj){
      vm.opAnswer = obj.response;
      $ionicSlideBoxDelegate.slide(numQuestions++);
    });

    socketIO.on('change name', function(obj){
      console.log(obj);
    })

    vm.checkResponse = function(response, correctResponse){
      console.log(vm.player2Found);
      if(response != correctResponse) return false;
      $ionicSlideBoxDelegate.slide(numQuestions++);
      if(numQuestions == qkConstantes.api.nbQuestionsPerLevel){
        routerHelper.goToState('levels');
      }
      socketIO.emit('answer',{response: correctResponse, player: $rootScope.game.player, name: $rootScope.game.name});
    }

    function init(){
      console.log($rootScope.game);
      vm.answers = persistFetchedResults.getItem('ACTIVE_LEVEL');
      vm.player2Found = $rootScope.game.player == 'player1' ? $rootScope.player2Found : true;
    }
    // ################# INITALIZE ################# //

    init();
  }
})();
