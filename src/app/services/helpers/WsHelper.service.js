(function () {
    'use strict';

    angular
        .module('questOfknowledges')
    /**
     * Web Services Helpers
     */

        .factory('WsHelper', function ($rootScope, $window) {

            // ############################################# //
            // ############### PUBLIC BUSINESS ############# //
            // ############################################# //

            /**
             * Is the the device is connected to the internet ?
             * @returns {boolean}
             */
            function isOnline() {
              $rootScope.online = navigator.onLine;
              $window.addEventListener("offline", function() {
                $rootScope.$apply(function() {
                  $rootScope.online = false;
                  console.log(false);
                });
              }, false);

              $window.addEventListener("online", function() {
                $rootScope.$apply(function() {
                  $rootScope.online = true;
                  console.log(true);
                });
              }, false);
                /* jshint ignore:start */
                if (angular.isDefined(navigator.connection) && angular.isDefined(navigator.connection.type) && typeof Connection !== 'undefined') {
                    var networkState = navigator.connection.type;
                    var states = {};
                    states[Connection.UNKNOWN] = false;
                    states[Connection.ETHERNET] = true;
                    states[Connection.WIFI] = true;
                    states[Connection.CELL_2G] = true;
                    states[Connection.CELL_3G] = true;
                    states[Connection.CELL_4G] = true;
                    states[Connection.CELL] = true;
                    states[Connection.NONE] = false;
                    return states[networkState];
                }
                else {
                    return navigator.onLine === true;
                }
                /* jshint ignore:end */
            }

            // ############################################# //
            // ############## PRIVATE BUSINESS ############# //
            // ############################################# //

            // ############################################# //
            // ################### API ##################### //
            // ############################################# //

            return {
              isOnline: isOnline
            };
        });

})();
