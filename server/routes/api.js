/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:44 AM
 */

var media = require('../lib/media');

function getConfiguration (req, res) {
  var config = {
    mediaDirectory : media.mediaDirectory()
  };
  res.json(config);
}

function getSemesters (req, res) {
  media.getSemesters(function (error, semesters) {
    if (!error) {
      res.json(semesters);
    }
  });
}

module.exports = {
  media : {
    getSemesters :  getSemesters
  },

  config : getConfiguration
};