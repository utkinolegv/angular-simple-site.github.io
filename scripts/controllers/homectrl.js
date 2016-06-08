  'use strict';

  angular
        .module('expertApp')
        .controller('HomeCtrl', HomeCtrlController);
 
  HomeCtrlController.$inject = ['$scope', '$rootScope', '$http', '$state', '$sce'];
  function HomeCtrlController($scope, $rootScope, $http, $state, $sce) {

       $scope.title = $rootScope.siteName;

       $http.get("backend/getmenu.php?level=0").then(function (response) {
        $scope.firstmenu = response.data.records;
       });

       $scope.footerLeftHTML = function() {
        return $sce.trustAsHtml($rootScope.footerLeft);
       };

       $scope.footerRightHTML = function() {
        return $sce.trustAsHtml($rootScope.footerRight);
       };
         
  }

 