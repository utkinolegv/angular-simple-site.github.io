'use strict';

angular
  .module('expertApp', [
    'bootstrapSubmenu',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngCookies'
  ])
  .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$rootScopeProvider',
   function ($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $rootScopeProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:false,
      modules: [{
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
      },
      {
                  name:'toggle-switch',
                  files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"]
      },
      {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
      },
      {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
      },
      {
                  name:'utf8-base64',
                  files:['bower_components/angular-utf8/angular-utf8-base64.min.js']
      },
      {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
      },
      {
                   name:'angularFileUpload',
                   files:['bower_components/angular-file-upload/angular-file-upload.min.js']
      },
      {
                   name:'colorpicker.module',
                   files:['scripts/app-services/bootstrap-colorpicker-module.js']
      },
      {
                   name:'modalService',
                   files:['scripts/app-services/modal.service.js']
      },
      {
                   name:'wysiwyg.module',
                   files:['scripts/app-services/editor.min.css',
                    'scripts/app-services/wysiwyg.min.js']
      }]
    });
    $urlRouterProvider.otherwise('/site/welcome');
    $stateProvider.state('site',{
        abstract: true,
        template:'<div ui-view=""></div>',
        url:'/site',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load('ngAnimate'),
            $ocLazyLoad.load('ngResource'),
            $ocLazyLoad.load('ngSanitize'),
            $ocLazyLoad.load('utf8-base64')
          }
        }
      })
      .state('site.welcome',{
        url:'/welcome',
        views: {
                '': {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                },
                'site_content@site.welcome': {
                    templateUrl: 'views/welcome.html',
                    controller: 'Welcome'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:['scripts/controllers/welcome.js']
            })
          }
        }
      })
      .state('site.login',{
        url:'/login',
        views: {
                '': {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                },
                'site_content@site.login': {
                    templateUrl: 'views/pages/login.html',
                    controller: 'Login',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                 'scripts/controllers/Login.js',
                 'scripts/app-services/authentication.service.js',
                 'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
      })
      .state('site.page',{
        url:'/page/:pageId',
        views: {
                '': {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                },
                'site_content@site.page': {
                    templateUrl: 'views/pages/blank.html',
                    controller:'page',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/page.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
      })
      .state('site.news',{
        url:'/news/:pageId',
        views: {
                '': {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                },
                'site_content@site.news': {
                    templateUrl: 'views/pages/blank.html',
                    controller:'page',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/page.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
      })
      .state('site.reg', {
        url:'/reg',
        views: {
                '': {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                },
                'site_content@site.reg': {
                    templateUrl: 'views/pages/register.html',
                    controller:'Register',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                 'scripts/controllers/Register.js',
                 'scripts/app-services/flash.service.js',
                 'scripts/app-services/user.service.local-storage.js'
                ]
            })
          }
        }
      })
     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     // Admin panel 
     // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     .state('dashboard', {
        abstract: true,
        template:'<div ui-view=""></div>',
        url:'/dashboard',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'expertApp',
                    files:[
                    'styles/sb-admin-2.css',
                    'js/sb-admin-2.js'
                    ]
                }),
                $ocLazyLoad.load('ngAnimate'),
                $ocLazyLoad.load('ngResource'),
                $ocLazyLoad.load('ngSanitize'),
                $ocLazyLoad.load('utf8-base64')
           }
        }
     })

     .state('dashboard.logout',{
        url:'/logout',
        controller: function($window, $location, $http) {
         $http.get("backend/logout.php").then(function (response) {
           $window.location='/#/site/login';
         });  
        }
     })
     
     .state('dashboard.pages',{
        url:'/pages/:pageId',
        views: {
                '': {
                    templateUrl: 'views/dashboard/main.html',
                    controller:'Panel',
                },
                'panel_content@dashboard.pages': {
                    templateUrl: 'views/pages.html',
                    controller:'pages',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:['scripts/controllers/pages.js']
            })
          }
        }
     })

     .state('dashboard.pictures',{
        url:'/pictures',
        views: {
                '': {
                    templateUrl: 'views/dashboard/main.html',
                    controller:'Panel',
                },
                'panel_content@dashboard.pictures': {
                    templateUrl: 'views/selection.html',
                    controller:'uploader',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/uploader.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
     })

     .state('dashboard.files',{
        url:'/files',
        views: {
                '': {
                    templateUrl: 'views/dashboard/main.html',
                    controller:'Panel',
                },
                'panel_content@dashboard.files': {
                    templateUrl: 'views/files.html',
                    controller:'filesuploader',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/filesuploader.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
     })
     
     .state('dashboard.profile',{
        url:'/profile',
        views: {
                '': {
                    templateUrl: 'views/dashboard/main.html',
                    controller:'Panel',
                },
                'panel_content@dashboard.profile': {
                    templateUrl: 'views/profile.html',
                    controller:'profile',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/profile.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
     })

     .state('dashboard.titlesection',{
        url:'/titlesection',
        views: {
                '': {
                    templateUrl: 'views/dashboard/main.html',
                    controller:'Panel',
                },
                'panel_content@dashboard.titlesection': {
                    templateUrl: 'views/titlesection.html',
                    controller:'titlesection',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/titlesection.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
     })
     .state('dashboard.editpage',{
        url:'/editpage/:pageId/:pageType/:parentId',
        views: {
                '': {
                    templateUrl: 'views/dashboard/main.html',
                    controller:'Panel',
                },
                'panel_content@dashboard.editpage': {
                    templateUrl: 'views/editpage.html',
                    controller:'editpage',
                    controllerAs: 'vm'
                }
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load('colorpicker.module'),
                $ocLazyLoad.load('wysiwyg.module'),
                $ocLazyLoad.load({
                name:'expertApp',
                files:[
                  'scripts/controllers/editpage.js',
                  'scripts/app-services/flash.service.js'
                ]
            })
          }
        }
     })
     .state('dashboard.delpage',{
        url:'/delpage/:pageId/:pageType/:parentId',
        controller: function($window, $location, $stateParams, $http, $state) {
           $http.get("backend/delpage.php?id="+$stateParams.pageId).then(function (response) {
             $window.location='/#/dashboard/pages/'+$stateParams.parentId;
           });
        }
     })
     .state('dashboard.switchpage',{
        url:'/switchpage/:pageId/:pageType/:parentId',
        controller: function($window, $location, $stateParams, $http) {
         $http.get("backend/setswitch.php?id="+$stateParams.pageId).then(function (response) {
           $window.location='/#/dashboard/pages/'+$stateParams.parentId;
         });  
        }
     })
     .state('dashboard.movepage',{
        url:'/movepage/:move/:pageId/:pageType/:parentId',
        controller: function($window, $location, $stateParams, $http) {
         console.log("backend/movepage.php?id="+$stateParams.pageId+"&m="+$stateParams.move+"&p="+$stateParams.parentId+"&t="+$stateParams.pageType);
         $http.get("backend/movepage.php?id="+$stateParams.pageId+"&m="+$stateParams.move+"&p="+$stateParams.parentId+"&t="+$stateParams.pageType).then(function (response) {
          $window.location='/#/dashboard/pages/'+$stateParams.parentId;
         });  
        }
     })
   }])
   .controller('homeCtrl', ['$scope', '$rootScope', '$http', '$state', '$sce', function ($scope, $rootScope, $http, $state, $sce) { 
       $scope.footerLeftHTML = function() {
        return $sce.trustAsHtml($rootScope.footerLeft);
       };
       $scope.footerRightHTML = function() {
        return $sce.trustAsHtml($rootScope.footerRight);
       };
   }])  
   .controller('Panel', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) { 
      $scope.username = $rootScope.globals.currentUser.username;
   }])
   .controller('menuController', function($scope, $http, $rootScope, $sce){
         $scope.loginHTML = function() {
              if ($rootScope.globals.currentUser){
               return $sce.trustAsHtml($rootScope.logOut);
              }
              else {
               return $sce.trustAsHtml($rootScope.logIn);
              }
         };
         $scope.sitetitle = $rootScope.siteName;
         $http.get("backend/getmenu.php?level=0").then(function (response) {
          $scope.menuItems = response.data;
         }); 
   })
   .run(['$templateCache', '$window', '$state', '$rootScope', '$location', '$cookieStore', '$http', function ($templateCache, $window, $state, $rootScope, $location, $cookieStore, $http){
        
        // clear templateURL
        $templateCache.removeAll();
        // site settings
        $rootScope.siteName = 'You site name';
        $rootScope.footerLeft = 'Left footer HTML text';
        $rootScope.footerRight = 'Right footer HTML text';
        
        $rootScope.logIn = '<a title="Login" href="#/site/login"><i class="fa fa-sign-in fa-fw"></i> Login</a>';
        $rootScope.logOut = '<a title="Logout" href="#/dashboard/logout"><i class="fa fa-sign-out fa-fw"></i> Logout</a>';
         
        $rootScope.globals = $cookieStore.get('globals') || {};
        
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedRoot = $location.path().indexOf('dashboard') > -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedRoot && !loggedIn) {
              $window.location='/#/site/welcome';
            }
        });
   }]);  

    
