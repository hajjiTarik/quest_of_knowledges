/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('questOfknowledges')
        .controller('homeController', HomeControllerFct);


    function HomeControllerFct(persistFetchedResults, $scope){

        var vm = this;
        var playerSettings = persistFetchedResults.getItem('PLAYER_SETTINGS');

        vm.playerAudioSettings = function () {
          if(!vm.audio) return;
          playerSettings.audio = vm.audio;
          persistFetchedResults.setItem('PLAYER_SETTINGS', playerSettings);
        }
        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
          vm.audio = playerSettings.audio;
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
