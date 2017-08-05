(function () {
  'use strict';

  angular
    .module('questOfknowledges')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $ionicPlatform, WsHelper, socketIO) {

    // Test de la connexion internet
    WsHelper.isOnline();
    socketIO.on('onconnected', function (id) {
      console.log('vous etes connectés avec:', id);
    })

    $ionicPlatform.ready(function () {

      if (typeof cordova !== 'undefined') {
        var so = window.cordova.plugins.screenorientation;
        so.setOrientation(so.Orientations[0]);
      }

    });

    $log.debug('runBlock end');
  }

})();
