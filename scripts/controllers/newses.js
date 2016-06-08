  
    'use strict';
 
    angular
        .module('expertApp')
        .controller('newses', NewsesController);
 
    NewsesController.$inject = ['$scope', '$http', '$window', '$location', '$rootScope', '$stateParams', 'base64'];
    function NewsesController($scope, $http, $window, $location, $rootScope, $stateParams, base64) {
     
      $rootScope.title = $rootScope.siteName + ' - administrator - newses';
      $scope.parent = $stateParams.pageId;
      $scope.name = '';
      
      if ($stateParams.pageId!=0){
       $http.get("backend/getpage.php?id="+$stateParams.pageId).then(function (response) {
            $scope.name = base64.decode(response.data.name);
       });  
      }

      $http.get("backend/getpages.php?t=news&i="+$stateParams.pageId).then(function (response) {
       $scope.newses = response.data.records;
      });
      
    }
 
