(function () {
    'use strict';

    angular.module('questOfknowledges').factory('routerHelper', function ($state) {

        // ################################### //
        // ######## PUBLIC BUSINESS ########## //
        // ################################### //

        /**
         * Is current state ?
         * @param name
         * @returns {boolean}
         */
        function isState(name) {
            var result = false;
            if (angular.isDefined(name)) {
                result = $state.is(name);
            }
            return result;
        }


        /**
         * go to the state
         * @param to
         * @param params
         * @param options
         */
        function goToState(to, params, options) {
            $state.go(to, params, options);

            /*$ionicHistory.nextViewOptions({
                disableAnimate: disableAnimateEnter,
                disableBack: false,
                historyRoot: historyRoot
            });*/
        }

        // ################################### //
        // ############### API ############### //
        // ################################### //

        return {
            isState: isState,
            goToState: goToState
        };
    });

})();