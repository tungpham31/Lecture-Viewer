/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:32 AM
 */
var fs = require('fs');

var SEMESTER_DIR = '/media/';

/**
 * Invokes the callback on the returned list of semesters.
 * @param cb
 */
function getSemesters (cb) {
  fs.readdir(SEMESTER_DIR, function (error, dirs) {
    if (error) {
      error = {
        message : 'Directory does not exist: ' + SEMESTER_DIR
      };
    }
    cb(error, dirs);
  });
}

module.exports = {
  getSemesters : getSemesters
};