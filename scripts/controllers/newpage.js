  
    'use strict';
 
    angular
        .module('expertApp', ['colorpicker.module', 'wysiwyg.module', 'utf8-base64'])
        .controller('newpage', NewpageController);
 
    NewpageController.$inject = ['$window', '$location', '$scope', '$http', '$state', 'FlashService', 'base64', '$stateParams'];
    function NewpageController($window, $location, $scope, $http, $state, FlashService, base64, $stateParams) {
        var vm = this;
       
        vm.newpage = newpage;
        vm.pagetype = $stateParams.pageType;
        $scope.parent = $stateParams.parentId;
        
        /*
        $scope.data = {
          records: [
            {Id: '0', Name: 'Нулевой'}
          ]
        };
        
        if ($stateParams.pageType === 'page')
        {
         $http.get("backend/getpages.php?z=1").then(function (response) {
          // Заполним массив имен
          $scope.data.records = response.data.records;
          vm.level = {Id: '0', Name: 'Нулевой'};
         });
        }
        else
        if ($stateParams.pageType === 'news' || $stateParams.pageType === 'foldernews' || $stateParams.pageType === 'folderpage')
        {
         vm.level = {Id: '0', Name: 'Нулевой'};
        } */
        
        function newpage() {

            vm.dataLoading = true;

            var encon = '', ensn = '';
            
            if ($stateParams.pageType === 'news' || $stateParams.pageType === 'page')
            {
             encon = base64.encode(vm.content);
            } 

            if ($stateParams.pageType === 'news')
            {
             ensn = base64.encode(vm.shortnews);
            } 

            var data = {
                      name: base64.encode(vm.name), 
                      content: encon, 
                      id: 0,
                      level : $stateParams.parentId, 
                      background : vm.background, 
                      shortnews: ensn, 
                      pagetype: $stateParams.pageType
            };
                   
            $http({     
              method  : 'POST',
              url     : 'backend/addpage.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             })
             .success(function(data) {
                if (data.success) {
                    $window.location='/#/dashboard/pages/'+$stateParams.parentId;
                } else {
                    FlashService.Error('Ошибка при сохранении данных.');
                    vm.dataLoading = false;
                }
             });
        
        }
        
   }        
    
