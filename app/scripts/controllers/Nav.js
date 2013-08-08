'use strict';

//THIS IS THE CONTROLLER FOR THE NAVBAR

angular.module('lectureApp')
  .controller('NavCtrl', function ($scope, lecture) {
    //$scope.currentUser = lecture.currentUser();
    // TODO: currently, this is called several times from index.html rather
    // then using a scope variable. If you initialize a scope variable, it
    // would not grab the user from the lecture service. This works below,
    // however, it is not the most efficient. Perhaps we can figure out a
    // better way of doing this at a later point.
    $scope.getCurrentUser = function () {
      $scope.currentUser = lecture.currentUser()
    };

    $scope.$on('lecture:login', function () {
      $scope.currentUser = lecture.currentUser();
    });

    $scope.$on('lecture:logout', function () {
      $scope.currentUser = lecture.currentUser();
    });

    $scope.getCurrentUser();
    
    $scope.signout = function () {
      lecture.logout()
        .then(function () {
	  window.location = '#/splash';
	});
    };

  });
