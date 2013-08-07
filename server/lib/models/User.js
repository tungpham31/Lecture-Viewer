'use strict';

var Q        = require('q');
var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
  email: String,
  pass : String,
  role : String
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

// Create the model:
var User = mongoose.model('User', UserSchema);

// Exports:
exports.User = User;
