'use strict';

/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:32 AM
 */
var fs     = require('fs');
var CONFIG = require('config');
var Q      = require('q');

// Constants:
var MEDIA_DIR = CONFIG.Media.root;

function location () {
  return MEDIA_DIR;
}

/**
 * mkpath constructs a path from a qry object to be used by
 * other functions. It does not test to see if the directory
 * exists - it leaves this to calling functions. The qry
 * object may be empty or include one of the following
 * properties:
 *
 *  semester : the semester of a recording.
 *  course   : the course of the recording.
 *  lecture  : the lecture of the recording.
 *
 * @private
 * @returns the constructed path
 */
function mkpath (qry) {
  var path = [
    qry.semester,
    qry.course,
    qry.lecture
  ];
  var dir      = MEDIA_DIR;
  while (path[0]) {
    dir += '/' + path.shift();
  }
  return dir;
}

function urlpath (qry) {
  var path = [
    qry.semester,
    qry.course,
    qry.lecture
  ];
  var dir      = '';
  while (path[0]) {
    dir += '/' + path.shift();
  }
  return dir;
}

/**
 * The query function receives a qry object and invokes
 * the callback with the signature cb(error, list). The
 * cb will receive an error if the query fails; otherwise
 * it will receive a list of results from the query. The
 * qry object may receive the following properties:
 *
 *  semester : the semester of a recording.
 *  course   : the course of the recording.
 *  lecture  : the lecture of the recording.
 *
 * If the qry object is empty it will provide a list of
 * the existing semesters.
 *
 * @public
 */
function query (qry, cb) {
  var path = mkpath(qry);
  fs.readdir(path, function (error, list) {
    if (error) {
      cb(path + ' does not exist');
    }
    else {
      var result = {
        url   : urlpath(qry),
        files : list
      };
      cb(undefined, result);
    }
  });
}

/**
 * video returns a summary of the videos available for
 * a given lecture. The qry object must have the semester,
 * course, and lecture. The object that is returned has the
 * following properties:
 *
 * semester : the semester
 * course   : the course
 * lecture  : the lecture
 * files    : the list of video files
 *
 * The callback function has the signature cb(error, result)
 * where the result is the object containing the properties
 * above.
 *
 * @public
 */
function video (qry, cb) {
  if (!qry.semester ||
      !qry.course   ||
      !qry.lecture) {
    cb('query requires semester, course, and lecture');
  }
  else {
    var path = mkpath(qry);
    fs.readdir(path, function(error, list) {
      if (error) {
        cb(path + ' does not exist');
      } else {
        var video = {
          semester: qry.semester,
          course: qry.course,
          lecture: qry.lecture,
          files: []
        };
        // Supported video formats:
        var format = /.*\.(mp4|ogg|webm)$/;
        for (var i = 0; i < list.length; i++) {
          if (format.exec(list[i])) {
            video.files.push(list[i]);
          }
        }
        cb(undefined, video);
      }
    });
  }
}

function screen (qry, cb) {
  if (!qry.semester ||
      !qry.course   ||
      !qry.lecture) {
    cb('query requires semester, course, and lecture');
  }
  else {
    var path = mkpath(qry) + '/screen';
    fs.readdir(path, function(error, list) {
      if (error) {
        cb(path + ' does not exist');
      } else {
        var screen = {
          semester: qry.semester,
          course: qry.course,
          lecture: qry.lecture,
          files: []
        };
        // Supported screen formats:
        var format = /.*\.(png)$/;
        for (var i = 0; i < list.length; i++) {
          if (format.exec(list[i])) {
            screen.files.push(list[i]);
          }
        }
        cb(undefined, screen);
      }
    });
  }
}

function whiteboard (qry, cb) {
  if (!qry.semester ||
      !qry.course   ||
      !qry.lecture) {
    cb('query requires semester, course, and lecture');
  }
  else {
    var path = mkpath(qry) + '/whiteboard';
    fs.readdir(path, function(error, list) {
      if (error) {
        cb(path + ' does not exist');
      } else {
        var whiteboard = {
          semester: qry.semester,
          course: qry.course,
          lecture: qry.lecture,
          files: []
        };
        // Supported whiteboard formats:
        var format = /.*\.(png)$/;
        for (var i = 0; i < list.length; i++) {
          if (format.exec(list[i])) {
            whiteboard.files.push(list[i]);
          }
        }
        cb(undefined, whiteboard);
      }
    });
  }
}

function full(qry, cb) {
  if (!qry.semester ||
      !qry.course   ||
      !qry.lecture) {
    cb('query requires semester, course, and lecture');
  }
  else {
    video(qry, function (error, v) {
      if (error) {
        cb(error);
      }
      else {
        screen(qry, function(error, s) {
          if (error) {
            cb(error);
          } else {
            whiteboard(qry, function(error, w) {
              if (error) {
                cb(error);
              } else {
                var full = {
                  video: v,
                  screen: s,
                  whiteboard: w
                };
                cb(undefined, full);
              }
            });
          }
        });
      }
    });
  }
}

function all() {
  function getSemesters() {
    var defer = Q.defer();
    query({}, function (err, semesters) {
      if (err) {
        defer.reject(err);
      }
      else {
        defer.resolve(semesters);
      }
    });
    return defer.promise;
  }

  function getCourses(semesters) {
    var results = [];
    for (var i = 0; i < semesters.files.length; i++) {
      (function () {
        var semester = semesters.files[i];
        var defer    = Q.defer();
        query({ semester : semester },
          function (err, courses) {
            if (err) {
              defer.reject(err);
            }
            else {
              var courselist = [];
              for (var i = 0; i < courses.files.length; i++) {
                courselist.push({
                  name : courses.files[i]
                });
              }
              var result = {
                semester : semester,
                courses  : courselist
              };
              defer.resolve(result);
            }
          });
        results.push(defer.promise);
      })();
    }
    return Q.all(results);
  }

  function getClasses(list) {

  }

getSemesters()
          .then(function (results) {
            console.log(results);
            return getCourses(results);
          })
          .then(function (results) {
            for (var i = 0; i < results.length; i++) {
              console.log(results[i]);
            }
          });

  return 1;
}

// Exported object:
module.exports = {
  query      : query,
  video      : video,
  screen     : screen,
  whiteboard : whiteboard,
  full       : full,
  location   : location,
  all        : all
};
