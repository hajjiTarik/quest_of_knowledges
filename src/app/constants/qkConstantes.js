(function () {

    'use strict';
    angular.module('questOfknowledges').constant('qkConstantes', {
      api: {
        base: 'https://opentdb.com/api.php',
        nbQuestionsPerLevel: 10,
      },
      states:{
        home:'home',
        levels:'levels',
        game:'game',
    	}
    });
})();