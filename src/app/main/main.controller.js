(function () {
  'use strict';

  angular
    .module('questOfknowledges')
    //Controller of the main page
    .controller('MainController', function (routerHelper, WsHelper, getQuestionAnswersService, $rootScope) {

      var vm = this;

      getQuestionAnswersService.fetchQuestionsAnswers();
      function init() {
        vm.goToState = routerHelper.goToState;
        vm.noConntection = WsHelper.isOnline();
      }

      init();
    });

})();
