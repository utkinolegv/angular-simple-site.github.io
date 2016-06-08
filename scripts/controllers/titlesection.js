  
    'use strict';
 
    angular
        .module('expertApp', ['utf8-base64'])
        .controller('titlesection', TitlesectionController);
 
    TitlesectionController.$inject = ['$window', '$location', '$scope', '$http', 'FlashService', 'base64'];
    function TitlesectionController($window, $location, $scope, $http, FlashService, base64) {
        var vm = this;
        
        vm.change = change;
        
        vm.dataLoading = true;
        
        $http.get("backend/getsection.php?id=1")
         .then(function (response) {
          vm.dataLoading = false;
          if ((response.data.param0 !== undefined) && (response.data.param0 !== null))
           vm.titleh3 = base64.decode(response.data.param0);
          if ((response.data.param1 !== undefined) && (response.data.param1 !== null))
           vm.titlemsg = base64.decode(response.data.param1);
          if ((response.data.param2 !== undefined) && (response.data.param2 !== null))
           vm.titleform = base64.decode(response.data.param2);
          if ((response.data.param3 !== undefined) && (response.data.param3 !== null))
           vm.submsg = base64.decode(response.data.param3);
          if ((response.data.param4 !== undefined) && (response.data.param4 !== null))
           vm.urlvideo = base64.decode(response.data.param4);
          if ((response.data.param5 !== undefined) && (response.data.param5 !== null))
           vm.urlbackground = base64.decode(response.data.param5);
        });  
 
 
       function change() {
            vm.dataLoading = true;

            var data = {
              id: 1,
              param0: vm.titleh3, 
              param1: vm.titlemsg, 
              param2: vm.titleform,
              param3: vm.submsg,
              param4: vm.urlvideo,
              param5: vm.urlbackground
            };
                   
            $http({     
              method  : 'POST',
              url     : 'backend/setsection.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             })
             .success(function(data) {
                if (data.success) {
                    vm.dataLoading = false;
                    FlashService.Success('Данные обновлены');
                    $window.location='/#/dashboard/titlesection';
                } else {
                    FlashService.Error('Ошибка при изменении данных');
                    vm.dataLoading = false;
                }
             });
        
        }; 
  }