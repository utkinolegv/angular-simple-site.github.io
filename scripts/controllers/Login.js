  
    'use strict';
 
    angular
        .module('expertApp')
        .controller('Login', LoginController);
 
    LoginController.$inject = ['$window', '$location', 'AuthenticationService', 'FlashService', '$rootScope'];
    function LoginController($window, $location, AuthenticationService, FlashService, $rootScope) {
        var vm = this;
 
        vm.login = login;

        $rootScope.title = $rootScope.siteName + ' - login';
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) { 
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $window.location='/#/dashboard/pages/0';
                } else {
                    FlashService.Error('Неправильное имя или пароль.');
                    vm.dataLoading = false;
                }
            });
        };
    }
 
