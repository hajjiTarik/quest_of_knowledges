/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('questOfknowledges')
        .controller('homeController', HomeControllerFct);


    function HomeControllerFct(getQuestionAnswersService){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
