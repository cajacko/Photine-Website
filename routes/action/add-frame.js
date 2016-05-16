/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Frames = require('../../models/frames');
// var passport = require('passport');

// Authenticate any requests to '/login/facebook'
router.post('/', function(req, res) {
  // If frameIf is set
  // If frame secret is set
  // If user is logged in
  // Make request

  if (req.body.frameId && req.body.frameSecret) {
    User.getUser(req, function(user) {
      if (user) {
        Frames.addUserFrame(user, req.body.frameId, req.body.frameSecret, function(err) {
          if (err) {
            res.send('Error adding to database');
          } else {
            res.send('All is well');
          }
        });
      } else {
        res.send('Use not logged in');
      }
    });
  } else {
    res.send('No post data');
  }
});

module.exports = router;
