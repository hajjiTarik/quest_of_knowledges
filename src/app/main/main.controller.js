(function () {
    'use strict';

    angular
        .module('questOfknowledges')
        //Controller of the main page
        .controller('MainController', function (routerHelper, WsHelper) {

            var vm = this;



            function init(){
                vm.goToState = routerHelper.goToState;
                vm.noConntection = WsHelper.isOnline();
            }

            init();
        });

})();
