(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('getQuestionAnswersService', function ($http, $q, WsHelper, $log, qkConstantes, utils, $rootScope) {
      function fetchQuestionsAnswers() {
        var defered = $q.defer();
        var url = qkConstantes.api.base + '?amount=' + qkConstantes.api.nbQuestionsPerLevel + '&category=9&type=multiple';

        if (!WsHelper.isOnline()) {
          defered.reject();
          return defered.promise;
        }
        $http.get(url).success(function (response) {
          if (utils.checkResponse(response.results)) {
            var newResults = utils.reformatResults(response.results);
            defered.resolve(newResults);
          } else {
            defered.reject(response);
          }
        }).error(function (error) {
          defered.reject(error);
        });

        return defered.promise;
      }

      return {
        fetchQuestionsAnswers: fetchQuestionsAnswers
      };
    });
}());