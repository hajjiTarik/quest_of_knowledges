(function(){
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('socketIO', initSocketIO);

  function  initSocketIO($rootScope) {
    var socket = io.connect('http://192.168.1.124:3003');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  }
}());