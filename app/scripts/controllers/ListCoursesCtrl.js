'use strict';

angular.module('lectureApp')
  .controller('ListCoursesCtrl', function($scope, lecture, MediaService) {
    $scope.currentUser = lecture.currentUser();

    //Pagination variables
    // TODO: What is this for?
    $scope.pageSize = 6;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.lectures.length / $scope.pageSize);
    };
    $scope.currentPage = 0;

    //used to filter by current year
    $scope.currentYear = 2013;

    $scope.profMap = {};
    $scope.professors = [];
    //list of lecture objects that will be displayed

    $scope.lectures = [];

    var promise = MediaService.getCourseList();

    promise.success(function(data, status) {
      for (var j = 0; j < data.length; j++) {
	console.log(status);
	console.log('success');
	$scope.lectures = [];
	var files = data[j].files;
	for (var i = 0; i < files.length; i++) {
          var details   = data[j].url.split('/');
          var semester  = details[1];
          var course    = details[2];
          var date      = files[i].split('--');
          var day       = new Date(date[0]);
          var time      = date[1].replace(/-/g,':');
          $scope.lectures.push({
            'id' : i,
            'title' : files[i],
            'semester' : semester,
            'course' : course,
            'instructor' : 'INSTRUCTORNAME?',
            'date' : day.toDateString() + ' - ' + time,
            'image': 'http://placehold.it/300x200'
          });
	}
      }
      console.log($scope.lectures);

      $scope.semesters = typeaheadList('semester');
      $scope.professors = typeaheadList('instructor');
      $scope.classes = typeaheadList('course');
      $scope.dates = typeaheadList('date');
      $scope.lectureSearch = '';
    });

    //takes a property of a lecture (professor, title) and returns a non-repeating list of it's values for lectures
    //used for typeahead
    var typeaheadList = function(property) {
      var hashMap = {};
      var list = [];
      //create a ghetto hashmap to get individual professors
      for (var i = 0; i < $scope.lectures.length; i++) {
        hashMap[$scope.lectures[i][property]] = 1;
      }
      //put professor names into a list for typeahead
      for (var prop in hashMap) {
        list.push(prop);
      }
      return list;
    };
  });
