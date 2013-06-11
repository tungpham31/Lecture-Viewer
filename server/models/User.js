'use strict';

var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  pass : String,
  role : String
});

// Define some useful methods
UserSchema.methods.fullName = function () {
  return this.fname + ' ' + this.lname;
};

UserSchema.methods.toString = function () {
  return this.fname + ' ' +
         this.lname + ' <' +
         this.email + '>';
};

// Create the model:
var User = mongoose.model('User', UserSchema);

// Exports:
exports.User = User;
