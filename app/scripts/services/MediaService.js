/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:01 AM
 *
 * The recordings service is used to access the server's media directory.
 */
function urlpath (qry) {
  var path = [
    qry.semester,
    qry.course,
    qry.lecture
  ];
  var dir      = '';
  while (path[0]) {
    dir += '/' + path.shift();
  }
  return dir;
}

angular.module('lectureApp')
  .factory('MediaService', function ($http) {
    return {
      query : function (qry) {
	return $http({
	  url    : '/api/media' + urlpath(qry),
	  method : 'GET'
	});
      },
      
      getSemesters : function () {
                        return $http({
                          url    : '/api/media/',
                          method : 'GET'
                        });
                      },
      getClasses   : function (semester) {
                        return $http({
                          url    : '/api/media/' + semester,
                          method : 'GET'
                        });
                      },
      getClass     : function getClass (semester, klass) {
                        return $http({
                          url    : '/api/media/' + semester + '/' + klass,
                          method : 'GET'
                        });
                      }
    };
  });

