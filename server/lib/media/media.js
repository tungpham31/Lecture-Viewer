/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:32 AM
 */
var fs     = require('fs');
var CONFIG = require('config');

// Constants:
var MEDIA_DIR = CONFIG.Media.root;

function mediaDirectory () {
  return MEDIA_DIR;
}

/**
 * Invokes the callback on the returned list of semesters.
 * @param cb
 */
function getSemesters (cb) {
  fs.readdir(MEDIA_DIR, function (error, dirs) {
    if (error) {
      error = {
        message : 'Directory does not exist: ' + MEDIA_DIR
      };
    }
    cb(error, dirs);
  });
}

function getClasses (semester, cb) {
  fs.readdir(MEDIA_DIR + '/' + semester, function (error, dirs) {
    if (error) {
      error = {
        message : 'Directory does not exist: ' + MEDIA_DIR + '/'
      }
    }
    cb(error, dirs);
  });
}

module.exports = {
  mediaDirectory : mediaDirectory,
  getSemesters   : getSemesters,
  getClasses     : getClasses
};