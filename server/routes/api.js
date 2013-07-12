/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:44 AM
 */

var media = require('lv-media');

function location (req, res) {
  var config = {
    mediaDirectory : media.location()
  };
  res.json(config);
}

function query (req, res) {
  var qry = {
    semester : req.params.semester,
    course   : req.params.course,
    lecture  : req.params.lecture
  };
  media.query(qry, function (error, list) {
    if (error) {
      res.json({ error : error });
    }
    else {
      qry.query = list;
      res.json(qry);
    }
  });
}

function full (req, res) {
  var semester = req.params.semester;
  var course   = req.params.course;
  var lecture  = req.params.lecture;
  // TODO: this will return all the information
  // about a particular lecture.
}


module.exports = {
  media : {
    query : query,
    full  : full    
  },

  config : location
};
