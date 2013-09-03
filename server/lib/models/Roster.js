'use strict';

var Q        = require('q');
var mongoose = require('mongoose');

// Roster Schema
var RosterSchema = mongoose.Schema({
  // Basic information:
  course   : String,
  semester : String,
  students : [ String ]
});

// Define some useful methods
// Checks the user against the roster for a course.
RosterSchema.methods.checkRoster = function (semester, course, email) {
    var deferred = Q.defer();
    
    var students = this.students;
    if (students.indexOf(email) != -1) {
        deferred.resolve({status: "REGISTERED",
                            message: email + " is enrolled in the course."});
    } else {
        deferred.reject({status: "NOT REGISTERED",
                            message: email + " is NOT officially enrolled in the course."});
    }
    
    return deferred.promise;
}


// This function simply makes an object (with methods)
// out of the object passed in to it. Not sure what
// the behavior is if it does not contain user fields.
RosterSchema.statics.deserialize = function (obj) {
  return new Roster(obj);
}

// Create the model:
var Roster = mongoose.model('Roster', RosterSchema);

// Exports:
exports.Roster = Roster;