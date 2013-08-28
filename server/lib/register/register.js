'use strict';

var Q    = require('q');

function Roster(semester, course, email) {
	this.semester = semester;
	this.course = course;
	this.email = email;
}
var rosterdb = [
	new Roster("Fall 2013","CMPSCI     105      0131735 1137LEC","caaaron@umass.edu"),
	new Roster("Fall 2013","CMPSCI     105      0131735 1137LEC","kadhikar@umass.edu"),
	new Roster("Fall 2013","CMPSCI     105      0131735 1137LEC","salongi@umass.edu"),
	new Roster("Fall 2013","CMPSCI     105      0131735 1137LEC","dtalves@umass.edu"),
	new Roster("Fall 2013","CMPSCI     105      0131735 1137LEC","aandow@umass.edu"),
	new Roster("Fall 2013","CMPSCI     105      0131735 1137LEC","aarella@umass.edu")
];

function getEmails (course) {
	var emails = [];
	for (var i=0; i<rosterdb.length; i++) {
		if (rosterdb[i].course === course) {
			emails.push(rosterdb[i].email);
		}
	}
	return emails;
}

function nregister (semester, course, email) {
	var emails = getEmails(course);
	var deferred = Q.defer();
	
	if (emails.indexOf(email) != -1) {
		deferred.resolve({status: "REGISTERED",
							message: "Successfully registered."});
	} else {
		deferred.reject({status: "NOT REGISTERED",
							message: email + " NOT officially enrolled in course."});
	}
}

exports.nregister = nregister;