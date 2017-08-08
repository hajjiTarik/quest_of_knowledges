/**
 * CONTROLLER : page videos
 */
(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .controller('gameController', GameControllerFct);


  function GameControllerFct(getQuestionAnswersService, $ionicSlideBoxDelegate,routerHelper,qkConstantes,socketIO,  $scope){

    var vm = this;
    var numQuestions = 0;
    var player2found = false;

    // ############## PRIVATE BUSINESS ############# //
    /**
     * init of the controler
     */
    vm.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    socketIO.on('chat message', function(msg){
      vm.list.push(msg);
      $scope.$apply();
    });

    socketIO.on('game', function(game){
      vm.game = game;
      $scope.$apply();
    });

    socketIO.on('player2 found', function(){
      console.log('player2 found');
      vm.myturn = true;
      vm.player2Found = true;
      $scope.$apply();
    });

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
      $scope.$apply();
      $ionicSlideBoxDelegate.slide(2);
    });

    vm.checkResponse = function(response, correctResponse){
      if(response != correctResponse) return false;
      numQuestions++;
      $ionicSlideBoxDelegate.slide(numQuestions);

      // régles d'exclusion
      if(numQuestions == qkConstantes.nbQuestionsPerLevel){
        routerHelper.goToState('levels');
      }
      socketIO.emit('answer',{response: correctResponse, player: vm.game.player, name: vm.game.name});
    }

    function init(){
    }
    // ################# INITALIZE ################# //

    init();
  }
})();
