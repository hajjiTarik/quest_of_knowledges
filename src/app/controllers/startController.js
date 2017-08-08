/**
 * CONTROLLER : page videos
 */
(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .controller('startController', HomeControllerFct);


  function HomeControllerFct(persistFetchedResults, routerHelper, $rootScope ,initializeGameService){

    var vm = this;
    var playerSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');
    // ############## PRIVATE BUSINESS ############# //
    /**
     * init of the controler
     */

    vm.getStarted = function(name){
      if(!name){
        vm.error = true;
        return;
      }
      playerSettings.name = name;
      persistFetchedResults.setItem('PLAYER_SETTINGS', playerSettings);
      routerHelper.goToState('home');
    }

    function init(){
      initializeGameService.isFirstTime();
    }
    // ################# INITALIZE ################# //

    init();
  }
})();
