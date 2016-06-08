'use strict';

angular.module('expertApp')
   .controller('headerNotificationController', ['$scope', '$rootScope', function($scope, $rootScope) {
     $scope.username = $rootScope.globals.currentUser.username;
   }])	
   .directive('headerNotification',function($rootScope){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
        
    }
	});


