(function () {
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('getQuestionAnswersService', function (utils, persistFetchedResults) {
      function fetchQuestionsAnswers(response) {
          if (utils.checkResponse(response)) {
            var newResults = utils.reformatResults(response.results);
            persistFetchedResults.setItem('APP_DATA', newResults);
          } else {
            persistFetchedResults.setItem('APP_DATA', {});
          }
      }

      return {
        fetchQuestionsAnswers: fetchQuestionsAnswers
      };
    });
}());