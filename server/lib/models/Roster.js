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
  
