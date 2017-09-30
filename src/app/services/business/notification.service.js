(function() {
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('notificationService', function () {

      function init() {
        if (window.FirebasePlugin) {

          window.FirebasePlugin.grantPermission();

          window.FirebasePlugin.hasPermission(function (data) {
            console.log(data.isEnabled);
          });

          console.log("heheh");
          window.FirebasePlugin.getToken(function (token) {
            // save this server-side and use it to push notifications to this device
            console.log(token);
          }, function (error) {
            console.error(error);
          });

          window.FirebasePlugin.onNotificationOpen(function (notification) {
            console.log(notification);
          }, function (error) {
            console.error(error);
          });
        }
      }

      return {
        init: init
      }
    });

})();