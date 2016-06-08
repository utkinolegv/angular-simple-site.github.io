'use strict';
 
    angular
        .module('expertApp')
        .controller('Register', RegisterController);
 
    RegisterController.$inject = ['$location', '$rootScope', 'FlashService', 'UserService'];
    function RegisterController($location, $rootScope, FlashService, UserService) {
        var vm = this;
 
        vm.register = register;
        
        $rootScope.title = $rootScope.siteName + ' - Регистрация программы';
 
        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Регистрация прошла успешно.', true);
                        $location.path('/site/welcome');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                }); 
        }
    }