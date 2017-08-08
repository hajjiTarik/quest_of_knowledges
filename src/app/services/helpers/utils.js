(function () {
  'use strict';

  angular.module('questOfknowledges').factory('utils', function () {

    // ################################### //
    // ######## PUBLIC BUSINESS ########## //
    // ################################### //

    /**
     * Is current state ?
     * @param response
     * @returns {boolean || object}
     */
    function checkResponse(data) {
      if(_.isEmpty(data) || _.isNull(data)) return false;
      return data;
    }

    /**
     *
     * @param results
     * @returns {Array}
     */
    function reformatResults(results) {
      if(!(results instanceof Array)) return;
      var newResults = [];
      results.map(function(result){
        var newResult = {};
        newResult.difficulty = result.difficulty;
        newResult.question = result.question;
        newResult.correct_answer = result.correct_answer;
        result.incorrect_answers.unshift(result.correct_answer);
        newResult.all_answer = shuffle(result.incorrect_answers);
        newResults.push(newResult);
      })

      return newResults;
    }

    /**
     *
     * @param array
     * @returns {*|Array.<T>}
     */
    function shuffle(array){
      return array.sort(function() { return Math.random() * 2 - 1});
    }

    /**
     * @returns {string}
     */
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    /**
     *
     * @returns {string}
     */
    function uuid(){
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    // ################################### //
    // ############### API ############### //
    // ################################### //

    return {
      checkResponse: checkResponse,
      reformatResults: reformatResults,
      uuid: uuid,
    };
  });

})();