/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../../models/user');

// Authenticate any requests to '/login/facebook'
router.get('/', passport.authenticate('facebook', {scope: ['email'], failureRedirect: '/'}), function(req, res) {
  // Get the user/register user if they do not already exist
  User.getUser(req, function(user) {
    // If the request has been successful then redirect to the home page, otherwise return an error
    if (user) {
      res.redirect('/dashboard');
    } else {
      // Error saving/logging in user
      res.render('pages/error', {
        errorCode: '001',
        errorTitle: 'Error logging in/registering user',
        errorMessage: 'Could not register.login the user at this time. Contact Charlie and complain!'
      });
    }
  });
});

module.exports = router;
