'use strict';

// Connect to Mongoose:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lecture-viewer');

// Import/export the models:
exports.User = require('./User.js').User;
