/**
 * CONTROLLER : page videos
 */
(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .controller('levelsController', LevelsControllerFct);


  function LevelsControllerFct(persistFetchedResults, routerHelper, qkConstantes){

    var vm = this;
    var playerSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');
    vm.selectedLevel = [];

    vm.levelSelected = function(index, inactive){
      if(inactive) return;
      vm.selectedLevel = vm.levels[index-1];
    }

    vm.startGame = function(level){
      if(_.isEmpty(level)){
        vm.error = "please select level";
        return;
      }
      vm.error = false;
      persistFetchedResults.setItem('ACTIVE_LEVEL', level);
      routerHelper.goToState('game');
    }
    // ############## PRIVATE BUSINESS ############# //
    /**
     * init of the controler
     */
    function init(){
      var data = persistFetchedResults.getItem('APP_DATA');
      vm.activatedLevel = playerSettings.activatedLevels;
      vm.levels = _.chunk(data, qkConstantes.api.nbQuestionsPerLevel);
    }
    // ################# INITALIZE ################# //

    init();
  }
})();
