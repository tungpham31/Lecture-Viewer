/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:01 AM
 *
 * The recordings service is used to access the server's media directory.
 */

function getSemesters () {
  return $http({
    url    : 'media/',
    method : 'GET'
  });
}

function getClasses (semester) {
  return $http({
    url    : 'media/' + semester,
    method : 'GET'
  });
}

function getClass (semester, klass) {
  return $http({
    url    : 'media/' + semester + '/' + klass,
    method : 'GET'
  });
}

angular.module('lectureApp')
  .factory('MediaService', function () {
    return {
      getSemesters : getSemesters,
      getClasses   : getClasses,
      getClass     : getClass
    };
  });

