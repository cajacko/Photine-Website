/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Frames = require('../models/frames');

// Authenticate any requests to '/login/facebook'
router.get('/', function(req, res) {
  // Get the user/register user if they do not already exist
  User.getUser(req, function(user) {
    // If the request has been successful then redirect to the home page, otherwise return an error
    if (user && user._id) {
      Frames.getUserFrames(user._id, function(frames) {
        res.render('pages/dashboard', {frames: frames});
      });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
