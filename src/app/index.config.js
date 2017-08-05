(function () {
    'use strict';

    angular
        .module('questOfknowledges')
        .config(config)
        .config(routes);

    /**
     * Configuration of the Hub News Application
     */
    function config($logProvider, configConstantes, $ionicConfigProvider) {

        // Enable/Disable the debug
        $logProvider.debugEnabled(configConstantes.logDebug);

        //Disable the text in the back button
        $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back');
    }

    /**
     * Routes definition
     * @param $stateProvider
     * @param $urlRouterProvider
     * @param statesConstantes
     */
    function routes($stateProvider, $urlRouterProvider, qkConstantes) {
        $stateProvider
            // STATE : app configuration interfaces
            .state(qkConstantes.states.home, {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'homeController as vm'
            })
            .state(qkConstantes.states.levels, {
                url: '/levels',
                templateUrl: 'app/views/levels.html',
                controller: 'levelsController as vm'
            })
            .state(qkConstantes.states.game, {
                url: '/game',
                templateUrl: 'app/views/game.html',
                controller: 'gameController as vm'
            });

         $urlRouterProvider.otherwise('/');
    }
})();
