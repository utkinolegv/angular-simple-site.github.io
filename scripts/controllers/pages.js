  
    'use strict';
 
    angular
        .module('expertApp')
        .controller('pages', PagesController);
 
    PagesController.$inject = ['$state', '$scope', '$http', '$window', '$location', '$rootScope', '$stateParams', 'base64'];
    function PagesController($state, $scope, $http, $window, $location, $rootScope, $stateParams, base64) {
     
      $rootScope.title = $rootScope.siteName + ' - administrator - pages';
      $scope.parent = $stateParams.pageId;
      $scope.name = '';
      
      if ($stateParams.pageId!=0){
       $http.get("backend/getpage.php?id="+$stateParams.pageId).then(function (response) {
            $scope.name = base64.decode(response.data.name);
       });  
      }
              
      $http.get("backend/getpages.php?t=page&i="+$stateParams.pageId).then(function (response) {
       $scope.pages = response.data.records;
      });
      
      $scope.del = function (id,type,parent) {
       
  /*  var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        modalTitle: function () {
          return 'Удаление';
        },
        modalBody: function () {
          return 'Удалить значение?';
        }
      }
    });  */

                   
       if($window.confirm('Удалить данные ID'+id+'?')){
        var params = { pageId:id, pageType:type, parentId:parent };
        $state.go('dashboard.delpage',params);
       } 
      };      
      
    }

/*angular.module('expertApp').
 controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});*/ 
