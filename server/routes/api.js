/**
 * Author: Tim Richards
 * Date  : 6/25/13
 * Time  : 11:44 AM
 */

var media = require('media');
var auth  = require('auth');
var register = require('register');

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

function login (req, res) {
  // Check if the user is already logged in:
  if (req.session.user) {
    res.json({ status  : 'AUTHENTICATED',
	       user    : req.session.user,
	       message : 'Authentication was successful' });    
  }
  else {
    var email = req.body.email;
    var pass  = req.body.pass;
    auth.auth(email, pass)
      .then(function (user) {
	req.session.user = user;
	res.json({ status  : 'AUTHENTICATED',
		   user    : user,
		   message : 'Authentication was successful' });
      })
      .fail(function (error) {
	res.json(error);
      });
  }
}

function create (req, res) {
  // Check if the user is already logged in:
  if (req.session.user) {
    res.json({ status  : 'AUTHENTICATED',
	       user    : req.session.user,
	       message : 'Authentication was successful' });    
  }
  else {  
    var email = req.body.email;
    var pass  = req.body.pass;
    auth.add(email, pass)
      .then(function (user) {
	req.session.user = user;
	res.json({ status  : 'AUTHENTICATED',
		   user    : user,
		   message : 'Authentication was successful' });      
      })
      .fail(function (error) {
	res.json(error);
      });
  }
}

function current (req, res) {
  // Check if the user is already logged in:
  if (req.session.user) {
    res.json({ status  : 'AUTHENTICATED',
	       user    : req.session.user,
	       message : 'Authentication was successful' });    
  }
  else {
    res.json({ status  : 'LOGGEDOUT',
	       message : 'Not logged in' });
  }
}

function logout (req, res) {
  req.session.destroy();
  res.json({ status : 'LOGOUT' });
}

function nregister (req, res) {
	register.nregister(req.body.semester, req.body.course, req.body.email)
		.then(function (data) {
			res.json(data);
		})
		.fail(function (error) {
			res.json(error);
		});
}

module.exports = {
  media : {
    query : query
  },

  auth : {
    login   : login,
    logout  : logout,
    create  : create,
    current : current
  },
  
  config : location,
  
  register : {
	nregister : nregister
  }
};
