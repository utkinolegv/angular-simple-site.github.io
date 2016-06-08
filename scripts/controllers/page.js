  
  'use strict';
 
  angular
        .module('expertApp', ['ngSanitize', 'utf8-base64'])
        .controller('page', PageController);
 
  PageController.$inject = ['$window', '$location', '$stateParams', '$scope', '$rootScope', '$http', '$state', '$sce', 'base64'];
  function PageController($window, $location, $stateParams, $scope, $rootScope, $http, $state, $sce, base64) {
        var vm = this;
       
        $http.get("backend/getpage.php?id="+$stateParams.pageId)
        .then(function (response) {
           
           $scope.pagetype = response.data.pagetype;
           
           if ($scope.pagetype === 'notfound')
           {
            $rootScope.title = $rootScope.siteName + ' - Страница не найдена';
           }
           else
           if (response.data.name != null)
           {
            $scope.date = response.data.date;
            $scope.background = response.data.background;
            $scope.shortnews = base64.decode(response.data.shortnews);
            $scope.parentname = base64.decode(response.data.parentname);
            
            vm.name = base64.decode(response.data.name);
            
            $rootScope.title = $rootScope.siteName + ' - ' + vm.name;
            
            $scope.DangerousHTML = function() {
               return $sce.trustAsHtml(base64.decode(response.data.content));
            };

            if ($scope.pagetype === 'news') {
              $http.get("backend/getpages.php?l=4&o=0&id="+$stateParams.pageId).then(function (response) {
                $scope.newses = response.data.records;
              });            
            } 
           
           } 
           else
           {
            $window.location='/#/site';
           }
        });  
  }
        
  