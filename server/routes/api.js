/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:44 AM
 */

var media = require('../lib/media');

function getSemesters (req, res) {
  media.getSemesters(function (semesters) {
    res.json(semesters);
  });
}

module.exports = {
  media : {
    getSemesters :  getSemesters
  }
};