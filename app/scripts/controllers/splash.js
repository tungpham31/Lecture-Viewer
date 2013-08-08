'use strict';

//THIS IS THE CONTROLLER FOR THE SPLASH/LOGIN PAGE/VIEW

angular.module('lectureApp')
  .controller('SplashCtrl', function ($scope, $location, lecture) {
    $scope.errorText = '';
    $scope.email = '';
    $scope.password = '';
    $scope.currentUser = lecture.currentUser();
    
    $scope.login = function () {
      var email   = $scope.email;
      var pass    = $scope.password;
      var create  = $scope.newUser;
      var promise = undefined;

      if (create) {
      	promise = lecture.addUser(email, pass);
      }
      else {
	promise = lecture.login(email, pass);
      }
      
      promise.then(
	function (data) {
	  $scope.errorText = '';
	  $scope.currentUser = lecture.currentUser();	  
          $location.path('/lectures');
	},
	function (data) {
	  $scope.errorText = data;
	});
    };

    $scope.logout = function () {
      var promise = lecture.logout();
      promise.then(
	function () {
	  $scope.currentUser = lecture.currentUser();
	},
	function () {
	  $scope.currentUser = lecture.currentUser();
	});
    };

  });
