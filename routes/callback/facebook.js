/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var facebook = require('../../models/facebook');

router.get('/', function(req, res) {
  var code = req.query.code;

  if (req.query.error) {
    // user might have disallowed the app
    res.send('login-error ' + req.query.error_description);
  } else if (!code) {
    res.send('No code');
  } else {
    var accessToken = facebook.facebookAccessToken(res, code, function(accessToken, expires) {
      console.log('oh righty', expires);
      res.send('yay');
    });
  }
});

module.exports = router;
