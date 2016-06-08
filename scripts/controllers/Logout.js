 
'use strict';
 
    angular
        .module('expertApp')
        .controller('logout', LogoutController);
 
    LogoutController.$inject = ['$http', '$window', '$location', '$rootScope'];
    function LogoutController($http, $window, $location, $rootScope) {
      
      $rootScope.title = $rootScope.siteName;
      
      $http.get("backend/logout.php").then(function (response) 
      {
         $window.location='/#/login';
      });
    }