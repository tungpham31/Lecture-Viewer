'use strict';

//THIS IS THE CONTROLLER FOR THE LECTURE SELECT PAGE/VIEW

angular.module('lectureApp')
  .controller('RegisterCtrl', function($scope, lecture, MediaService) {
    $scope.semesters = [];
    $scope.courses   = [];
    $scope.semester  = '';
    $scope.course    = '';
    
    // Fetch the available semesters:
    var promise = MediaService.getSemesters();
    
    promise.then(function(data, status) {
      var files = data.data.query.files;
      $scope.semesters = [];
      for (var i = 0; i < files.length; i++) {
	$scope.semesters.push({ name : files[i] });
      }
    });

    $scope.getCourses = function () {
      var promise = MediaService.getClasses($scope.semester.name);
      promise.then(function (data, status) {
     	var files = data.data.query.files;
     	$scope.courses = [];
     	for (var i = 0; i < files.length; i++) {
     	  $scope.courses.push({ name : files[i] });
     	}
     	$scope.course = $scope.courses[0];
     });
    };

    $scope.showCourse = function () {
      console.log($scope.course);
    };
    
  });
