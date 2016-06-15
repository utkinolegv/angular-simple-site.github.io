# Angular simple site builder

---
[Demo](http://demo.siberia-soft.ru/)

### About

**Angular simple site builder** is a site template based on [AngularJS](http://angularjs.org/) framework.


###Basic template features:

1. User authtorization support.  
2. WYSIWYG page editor. 
3. Support unlimit multilevel site menu. 
4. Two type of pages: news or simple page. 
5. All backend functions list in one PHP class 


### Application structure

- **backend** - Applicaton model in PHP files
- **scripts** - Application controllers
- **views** - Application HTML templates

### Installation
####1. Clone this project or Download that ZIP file

```sh
$ git clone https://github.com/utkinolegv/angular-simple-site.github.io
```

####2.  Make sure you have [bower](http://bower.io/) and [npm](https://www.npmjs.org/) installed globally
 
 
```sh
$ sudo apt-get install npm
$ sudo npm install -g bower
```
####3. On the command prompt run the following commands

```sh
$ cd `project-directory`
```
- bower install is ran from the postinstall
```sh
$ npm install 
```
```sh
$ npm start
```
####4. Create MySQL database from db.sql

- Change database settings in backend/classes/config.class.php

####5. Change site settings in scripts/app.js

- $rootScope.siteName = 'You site name'; 
- $rootScope.footerLeft = 'Left footer HTML text'; 
- $rootScope.footerRight = 'Right footer HTML text';

####6. Login and create first page

- Default username _test_ and password _test_




