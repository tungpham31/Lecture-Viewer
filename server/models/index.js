'use strict';

// Import the models:
var User = require('./User.js').User;

// Connect to Mongoose:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lecture-viewer');

function getUser(query, cb) {
  User.findOne(query, function (err, user) {
    if (err) {
      cb('getUser: Problem retrieving user: ' + err);
    }
    else {
      cb(undefined, user);
    }
  });
}

function removeUser(user, cb) {
  User.findOne(user, function (err, user) {
    if (err) {
      cb('getUser: Problem retrieving user: ' + err);
    }
    else {
      user.remove();
      cb(undefined);
    }
  });
}

function newUser(user, cb) {
  if (!user.fname ||
      !user.lname ||
      !user.email ||
      !user.pass  ||
      !user.role) {
    cb('Invalid user specification');
  }
  else {
    User.findOne({ email : user.email },
		 function (err, auser) {
		   if (!user) {
		     cb('User ' + auser.email + ' exists');
		   }
		   else {
		     User.create(user, function (err, user) {
		       if (err) {
			 cb('newUser: Problem creating user: ' + err);
		       }
		       else {
			 cb(undefined, user);
		       }
		     });
		   }
		 });
  }
}

exports.getUser    = getUser;
exports.newUser    = newUser;
exports.removeUser = removeUser;
