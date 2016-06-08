'use strict';


angular
    angular
        .module('expertApp', ['angularFileUpload'])
        .controller('uploader', UploaderController);
 
    UploaderController.$inject = ['$window', '$location', '$scope', '$http', '$state', 'FlashService', 'FileUploader'];
    function UploaderController($window, $location, $scope, $http, $state, FlashService, FileUploader) {

        var uploader = $scope.uploader = new FileUploader({
            url: 'backend/upload.php?dir=picupload'
        });


        $http.get("backend/getuploaded.php?dir=picupload").then(function (response) {
          for(var i = 0; i < response.data.records.length; i++ ){
           var fileItems = [];

           fileItems[i] = new FileUploader.FileItem($scope.uploader, response.data.records[i]);

           fileItems[i].progress = 100;  
           fileItems[i].isUploaded = true;
           fileItems[i].isSuccess = true;

           $scope.uploader.queue.push(fileItems[i]);
         
          }
        });
      
        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    
    }
