'use strict';

/**
 * Author: Tim Richards
 * Date  : Tue Aug  6 12:55:57 EDT 2013
 */
var fs     = require('fs');
var csv    = require('csv');
var CONFIG = require('config');

// Constants:
var USER_DIR = CONFIG.User.root;

function dir() {
  return USER_DIR;
}

// Loads the user files into memory.
function loadUsers() {
  
}

// Returns a list of the users.
function listUsers() {

}

// Returns a user record.
function getUser(name) {

}

// Adds a user record.
function addUser(props) {

}

// Removes a user.
function removeUser(props) {
  
}

csv()
  .from.path(USER_DIR+'/users.csv',
	     { delimiter : ',' })
  .on('record', function (row, index) {
    var u = {
      lname : row[0],
      fname : row[1],
      email : row[2]
    };
    users.push(u);
  });


// Exported object:
module.exports = {
  dir : dir,
  getUser : getUser,
  addUser : addUser,
  removeUser : removeUser,
  listUsers : listUsers
};

