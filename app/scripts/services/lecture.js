'use strict';

// This is the main service for the application. It should be
// the single source for data, and should serve as the model

angular.module('lectureApp')
  .factory('lecture', function ($http, $q, $rootScope) {
    // Set the logged in user from session storage in case the
    // browser is reloaded; false otherwise.
    var loggedIn = sessionStorage.getItem('user') || false;

    // Public API here
    return {
      addUser: function (email, pass) {
		var deferred = $q.defer();
		$http({
			url    : '/auth/create',
			method : 'POST',
			data   : { email : email,
						pass  : pass }
		})
		.then(
			function (data) {
				if (data.data.status === 'AUTHENTICATED') {
					// Set the module variable:
					loggedIn = { email : email };

					// Set session storage. This will be used across the
					// application views to determine if the user is
					// currently logged in:
					sessionStorage.setItem('user', email);
					
					deferred.resolve(loggedIn);

					// Notify other modules that need to display information
					// differently depending on the login status.
					$rootScope.$broadcast('lecture:login');
				}
				else {
					deferred.reject(data.data.message);
				}	
			},
			function (data) {
			  deferred.reject(data);
			}
		);
		
		return deferred.promise;
      },

      login: function (email, pass) {
		var deferred = $q.defer();
		$http({
		  url    : '/auth/login',
		  method : 'POST',
		  data   : { email : email,
				 pass  : pass }
		})
		.then(function (data) {
			if (data.data.status === 'AUTHENTICATED') {
			  // Set the module variable:
			  loggedIn = { email : email };
			  
			  // Set session storage. This will be used across the
			  // application views to determine if the user is
			  // currently logged in:
			  sessionStorage.setItem('user', email);	      
			  deferred.resolve(loggedIn);

			  // Notify other modules that need to display information
			  // differently depending on the login status.
			  $rootScope.$broadcast('lecture:login');
			}
			else {
			  deferred.reject(data.data.message);
			}	    
		});
		return deferred.promise;
      },

      logout: function () {
		console.log('calling logout: ' + loggedIn);
		var deferred = $q.defer();
		if (loggedIn) {
		  $http({
			url    : '/auth/logout',
			method : 'GET'
		  })
		  .then(
			function (data) {
				console.log('success');
				// Set the module variable:
				loggedIn = false;

				// Delete the session storage variable:
				sessionStorage.removeItem('user');
				
				deferred.resolve(loggedIn);

				// Notify other modules that need to display information
				// differently depending on the logout status.	      		
				$rootScope.$broadcast('lecture:logout');
			},
			function (data) {
				console.log('failure');
				// Delete the session storage variable:
				sessionStorage.removeItem('user');
				
				deferred.reject(data);
			}
		  );
		}
		else {
		  deferred.resolve(loggedIn);
		}
		return deferred.promise;
      },

      currentUser: function () {
	// var deferred = $q.defer();
	// if (!loggedIn) {
	//   $http({
	//     url    : '/auth/current',
	//     method : 'GET'
	//   })
	//     .then(
	//       function (data) {
	// 	if (data.data.status === 'AUTHENTICATED') {
	// 	  var email = data.data.user.email;
	// 	  loggedIn = { email : email };
	// 	  deferred.resolve(loggedIn);		
	// 	}
	// 	else {
	// 	  deferred.reject(false);
	// 	}	    
	//       },
	//       function (data) {
	// 	deferred.reject(false);
	//       });
	// }
        // return deferred.promise;
	return sessionStorage.getItem('user');
      },
	  
		//REGISTER
		register: function (semester, course, email) {
			var deferred = $q.defer();
			$http({
				url    : '/register',
				method : 'POST',
				data   : { semester : semester,
							course  : course,
							email	: email }
			})
			.then(function (data) {
					if (data.data.status === 'REGISTERED') {
					  deferred.resolve(true);
					} else {
						deferred.reject(data.data.message);
					}
				}
			);
		  return deferred.promise;
		}
		
    };
  });
