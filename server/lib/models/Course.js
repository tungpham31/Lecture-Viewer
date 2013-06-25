'use strict';

var mongoose = require('mongoose');

// User Schema
var CourseSchema = mongoose.Schema({
  number     : String,
  title      : String,
  semester   : String,
  days       : [String],
  starttime  : String,
  endtime    : String,
  instructor : String
});

// Create the model:
var Course = mongoose.model('Course', CourseSchema);

// Define some useful methods
// TODO

// Exports:
exports.Course = Course;

