/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:01 AM
 *
 * The recordings service is used to access the server's media directory.
 */

angular.module('lectureApp')
  .factory('MediaService', function ($http) {
    return {
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

