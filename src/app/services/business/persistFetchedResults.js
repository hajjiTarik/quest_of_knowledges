(function(){
  'use strict';
  angular
    .module('questOfknowledges')
    .factory('persistFetchedResults', function($log, qkConstantes, utils){
      function setItem(key, data){
        if(!utils.checkResponse(data)) return;
        localStorage.setItem(key, JSON.stringify(data));
      }

      function getItem(key){
        if(!key) return;
        return JSON.parse(localStorage.getItem(key));
      }

      function clearItem(key) {
        if(!key) return;
        localStorage.removeItem(key);
      }

      return {
        setItem: setItem,
        getItem: getItem,
        clearItem: clearItem,
      };
    });
}());