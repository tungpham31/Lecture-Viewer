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
	
	$scope.register = function () {
		//register for course
		//(1) check if email is in roster
		//if yes, register
		//if not, error - ask to check email and details
		var semester = $scope.semester;
		var course = $scope.course;
		var email = $scope.email;
		var promise = lecture.register(semester, course, email);
		promise.then(
			function(data) {
				$scope.errorText = '';
				//need currentUser - always displayed
				//$scope.currentUser = lecture.currentUser();
				$location.path('/lectures');
			},
			function(data) {
				$scope.errorText = data;
			}
		);
	};
    
  });
