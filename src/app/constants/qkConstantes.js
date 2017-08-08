(function () {

    'use strict';
    angular.module('questOfknowledges').constant('qkConstantes', {
      api: {
        base: 'https://opentdb.com/api.php',
        nbQuestionsPerLevel: 10,
      },
      states:{
        start: 'start',
        home:'home',
        levels:'levels',
        game:'game',
    	}
    });
})();