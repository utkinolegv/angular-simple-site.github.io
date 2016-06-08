  
    'use strict';
 
    angular
        .module('expertApp', ['utf8-base64'])
        .controller('profile', ProfileController);
 
    ProfileController.$inject = ['$window', '$location', '$scope', '$http', 'FlashService', 'base64'];
    function ProfileController($window, $location, $scope, $http, FlashService, base64) {
        var vm = this;
        
        vm.change = change;
        
        vm.dataLoading = true;
        
        $http.get("backend/getprofile.php")
         .then(function (response) {
          vm.dataLoading = false;
          vm.login = base64.decode(response.data.login);
          vm.pass = base64.decode(response.data.pass);
        });  
 
 
       function change() {
            vm.dataLoading = true;

            var data = {
              login: vm.login, 
              pass: vm.pass 
            };
                   
            $http({     
              method  : 'POST',
              url     : 'backend/profile.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             })
             .success(function(data) {
                if (data.success) {
                    vm.dataLoading = false;
                    $http.get("backend/logout.php").then(function (response) {
                     $window.location='/#/site/login';
                    });  
                } else {
                    FlashService.Error('Ошибка при изменении данных пользователя');
                    vm.dataLoading = false;
                }
             });
        
        }; 
  }