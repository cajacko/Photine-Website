/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var facebook = require('../../models/facebook');

router.get('/', function(req, res) {
  res.redirect(facebook.facebookLoginUrl());
});

module.exports = router;
