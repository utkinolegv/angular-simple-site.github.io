'use strict';

  angular
        .module('expertApp', ['ngSanitize', 'utf8-base64'])
        .controller('Welcome', WelcomeController);
 
  WelcomeController.$inject = ['$scope', '$rootScope', '$http', '$state', '$sce', 'base64'];
  function WelcomeController($scope, $rootScope, $http, $state, $sce, base64) {

        $rootScope.title = $rootScope.siteName;

        $http.get("backend/getsection.php?id=1")
         .then(function (response) {
          if ((response.data.param0 !== undefined) && (response.data.param0 !== null))
           $scope.titleh3 = base64.decode(response.data.param0);
          if ((response.data.param1 !== undefined) && (response.data.param1 !== null))
           $scope.titlemsg = base64.decode(response.data.param1);
          if ((response.data.param2 !== undefined) && (response.data.param2 !== null))
          {
           $scope.FormDangerousHTML = function() {
               return $sce.trustAsHtml(base64.decode(response.data.param2));
           };
          }
          if ((response.data.param3 !== undefined) && (response.data.param3 !== null))
           $scope.submsg = base64.decode(response.data.param3);
          if ((response.data.param4 !== undefined) && (response.data.param4 !== null)) {
           $scope.urlvideo = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + base64.decode(response.data.param4)); 
          }
          if ((response.data.param5 !== undefined) && (response.data.param5 !== null))
           $scope.urlbackground = base64.decode(response.data.param5);
        }); 

        $http.get("backend/getpages.php?l=4").then(function (response) {
         $scope.newses = response.data.records;
        });
         
  }
