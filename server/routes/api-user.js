var Q     = require('q');
var media = require('media');
var User  = require('models').User;

function getCourseList (req, res) {
  if (!req.session.user) {
    res.json({ status  : 'NOT_AUTHENTICATED',
	       message : 'User not authenticated' });    
  }
  else {
    var user = User.deserialize(req.session.user);
    user.getCourseList()
      .then(function (list) {
	res.json(list);
      });
  }
};

module.exports = {
  getCourseList : getCourseList
};
