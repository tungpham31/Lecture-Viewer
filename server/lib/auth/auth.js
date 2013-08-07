'use strict';

var Q    = require('q');
var User = require('models').User;

function auth (email, pass) {
  var deferred = Q.defer();
  User.findOne(
    { email : email },
    function (err, user) {
      if (err) {
	deferred.reject({ status  : 'MONGO_ERR',
			  message : err });	
      }
      else if (user === null) {
	deferred.reject({ status  : 'USER_NOT_EXISTS',
			  message : 'User ' + email +
			            ' does not exist' });
      }
      else {
	if (user.pass === pass) {
	  deferred.resolve(user);
	}
	else {
	  deferred.reject({ status  : 'BAD_PASSWORD',
			    message : 'Invalid password' });
	}
      }
    });
  return deferred.promise;
}

function add (email, pass, role) {
  var deferred = Q.defer();
  // Check if role is defined. If not, the default
  // role shall be VIEWER:
  role = role ? role : 'VIEWER';
  User.findOne(
    { email : email },
    function (err, user) {
      if (err) {
	deferred.reject({ status  : 'MONGO_ERR',
			  message : err });
      }
      else if (user !== null) {
	deferred.reject({ status  : 'USER_EXISTS',
		          message : 'User exists' });	
      }
      else {
	User.create(
	  { email : email,
	    pass  : pass,
	    role  : role },
	  function (err, u) {
	    if (err) {
	      deferred.reject({ status  : 'MONGO_ERR',
				message : err });
	    }
	    else {
	      deferred.resolve(u);
	    }
	  });
      }
    });
  return deferred.promise;
}

function remove (email) {
  var deferred = Q.defer();
  User.remove(
    { email : email },
    function (err) {
      if (err) {
	deferred.reject({ status  : 'MONGO_ERR',
			  message : err });	
      }
      else {
	deferred.resolve({ status  : 'SUCCESS',
			   message : 'User ' + email + ' removed' });
      }
    });  
  return deferred.promise;
}

exports.auth   = auth;
exports.add    = add;
exports.remove = remove;
