  
    'use strict';
 
  angular
  .module('expertApp', ['colorpicker.module', 'wysiwyg.module', 'utf8-base64', 'angularFileUpload'])
  .controller('editpage', EditpageController)
  .directive('targetBlank', function() {
    return {
     compile: function(element) {
      var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
      elems.attr("target", "_blank");
     }
    };
  })
  .directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })        
 
  EditpageController.$inject = ['$window', '$location', '$stateParams', '$scope', '$http', '$state', 'FlashService', 'base64', 'FileUploader'];
  
  function EditpageController($window, $location, $stateParams, $scope, $http, $state, FlashService, base64, FileUploader) {
        var vm = this;
        
        vm.editpage = editpage;
        vm.newpage = newpage;
        
        vm.pagetype = $stateParams.pageType;
        $scope.parent = $stateParams.parentId;
        $scope.pageid = $stateParams.pageId;
        
        if ($stateParams.pageType!='folder' && $stateParams.pageId!=0){
  
         var uploader = $scope.uploader = new FileUploader({
            url: 'backend/upload.php?dir=picupload/'+$stateParams.pageId
         });

         uploader.filters.push({
          name: 'imageFilter',
          fn: function(item, options) {
           var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
           return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
         });

         $scope.getFiles = function() {
          $http.get("backend/getuploaded.php?dir=picupload/"+$stateParams.pageId).then(function (response) {
           for(var i = 0; i < response.data.records.length; i++ ){
            var fileItems = [];

            fileItems[i] = new FileUploader.FileItem($scope.uploader, response.data.records[i]);

            fileItems[i].progress = 100;  
            fileItems[i].isUploaded = true;
            fileItems[i].isSuccess = true;

            $scope.uploader.queue.push(fileItems[i]);
         
           }
          }); 
         }   

         $scope.getFiles();

         uploader.onCompleteItem = function(fileItem, response, status, headers) {
          $scope.uploader.clearQueue();
          $scope.getFiles();
            // console.info('onCompleteItem', fileItem, response, status, headers);
         };
        
         $scope.deleteFile = function(idx) {
          var file = $scope.uploader.queue[idx];
          if (file.isUploaded) {
                $http.get("backend/delfile.php?d=picuload/deleted/"+file.name+"&f=picupload/"+$scope.pageid+"/"+file.name).then(function (response) {
                  $scope.uploader.queue.splice(idx, 1);
                });
          } 
         }
             
        }
        
        // Получим параметры страницы
        if ($stateParams.pageId!=0) {
 
         vm.dataLoading = true;
         
         //console.log($stateParams.pageId);
         
         $http.get("backend/getpage.php?id="+$stateParams.pageId)
         .then(function (response) {
          vm.dataLoading = false;
          
          vm.name = base64.decode(response.data.name);
          
          if ($stateParams.pageType === 'news')
          {
            vm.background = response.data.background;
            vm.shortnews = base64.decode(response.data.shortnews);
          }
          if ($stateParams.pageType === 'news' || $stateParams.pageType === 'page')
          {
            vm.content = base64.decode(response.data.content);
          }
          
          
         });  
       } 
       else
       {
          if ($stateParams.pageType === 'news')
          {
            vm.shortnews = 'Краткая информация';
          }
       }
 
       function editpage(close) {
       
            vm.dataLoading = true;

            var encon = '', ensn = '', bg= '';
            
            if ($stateParams.pageType === 'news' || $stateParams.pageType === 'page')
            {
             encon = base64.encode(vm.content);
            } 

            if ($stateParams.pageType === 'news')
            {
             ensn = base64.encode(vm.shortnews);
             bg = vm.background;
            } 

            var data = {
                      name: base64.encode(vm.name), 
                      content: encon, 
                      id: $stateParams.pageId,
                      level : $stateParams.parentId, 
                      background : bg, 
                      shortnews: ensn, 
                      pagetype: vm.pagetype
            };
                   
            $http({     
              method  : 'POST',
              url     : 'backend/addpage.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             })
             .success(function(data) {
                if (data.success) {
                    vm.dataLoading = false;
                    if (close) {
                      $window.location='/#/dashboard/pages/'+$stateParams.parentId;
                    }
                    else {
                     FlashService.Success('Страница успешно изменена.');
                    }
                } else {
                    FlashService.Error('Ошибка при изменении страницы.');
                    vm.dataLoading = false;
                }
             });
        
        };
        
        function newpage(close) {

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
                    vm.dataLoading = false;
                    if (close) {
                      $window.location='/#/dashboard/pages/'+$stateParams.parentId;
                    }
                    else {
                     FlashService.Success('Страница успешно создана.');
                    }
                } else {
                    FlashService.Error('Ошибка при сохранении данных.');
                    vm.dataLoading = false;
                }
             });
        
        };
         
  }