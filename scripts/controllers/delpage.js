  
    'use strict';
 
    angular
        .module('expertApp')
        .controller('delpage', DelpageController);
 
    DelpageController.$inject = ['$stateParams', '$http', '$window', '$location'];
    function DelpageController($stateParams, $http, $window, $location) {
        
        $http.get("backend/delpage.php?id="+$stateParams.pageId)
        .then(function (response) {
           $window.location='/#/dashboard/pages';
        });  
 
  }
        
