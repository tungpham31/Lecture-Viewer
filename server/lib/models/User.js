'use strict';

var Q        = require('q');
var mongoose = require('mongoose');
var media    = require('media');

// User Schema
var UserSchema = mongoose.Schema({
  // Basic information:
  email   : String,
  pass    : String,
  role    : String,
  // The list of courses a user is registered for:
  courses : [{ semester : String,
	       course   : String }]
});

// Define some useful methods
UserSchema.methods.toString = function () {
  return '<' + this.email + '>';
};

UserSchema.methods.setRole = function (role) {
  var deferred = Q.defer();
  this.role = role;
  this.save(function (err) {
    if (err)
      deferred.reject(err);
    else
      deferred.resolve(true);
  });
  return deferred.promise;
};

UserSchema.methods.addCourse = function (semester, course) {
  var deferred = Q.defer();
  // Check if already enrolled:
  var registered = this.courses;
  for (var i = 0; i < registered.length; i++) {
    var c = registered[i];
    if (c.semester === semester && c.course === course) {
      deferred.reject({ status  : 'USER_ALREADY_REGISTERED',
			message : 'User already registered' });
      return deferred.promise;
    }
  }
  registered.push({ semester : semester,
		    course   : course });
  deferred.resolve(true);

  this.save(function (err) {
    if (err)
      deferred.reject(err);
    else
      deferred.resolve(true);
  });
  
  return deferred.promise;
};

UserSchema.methods.removeCourse = function (semester, course) {
  var deferred = Q.defer();
  // Check if already enrolled:
  var registered = this.courses;
  for (var i = 0; i < registered.length; i++) {
    var c = registered[i];
    if (c.semester === semester && c.course === course) {
      registered.splice(i, 1);
      deferred.resolve(true);

      this.save(function (err) {
	if (err)
	  deferred.reject(err);
	else
	  deferred.resolve(true);
      });
      
      return deferred.promise;
    }
  }
  
  deferred.reject({ status  : 'USER_NOT_REGISTERED',
		    message : 'User not registered for course: ' +
		              semester + ' - ' + course
		  });
  
  return deferred.promise;
};

UserSchema.methods.getCourseList = function () {
  var results    = [];
  var registered = this.courses;
  for (var i = 0; i < registered.length; i++) {
    var query = { semester : registered[i].semester,
		  course   : registered[i].course };
    var deferred = Q.defer();
    results.push(deferred.promise);
    (function (deferred) {
      media.query(query, function (error, list) {
	if (error) {
	  deferred.reject(error);
	}
	else {
	  deferred.resolve(list);
	}
      });
    })(deferred);
  }

  var deferred = Q.defer();
  Q.all(results)
    .then(function (results) {
      deferred.resolve(results);
    });

  return deferred.promise;
};

// This function simply makes an object (with methods)
// out of the object passed in to it. Not sure what
// the behavior is if it does not contain user fields.
UserSchema.statics.deserialize = function (obj) {
  return new User(obj);
}

// Create the model:
var User = mongoose.model('User', UserSchema);

// Exports:
exports.User = User;
