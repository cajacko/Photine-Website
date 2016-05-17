/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Frames = require('../../models/frames');
var error = require('../../helpers/errors');
// var passport = require('passport');

// Authenticate any requests to '/login/facebook'
router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.body.frameId && req.body.frameSecret) {
    User.getUser(req, function(user) {
      if (user) {
        Frames.addUserFrame(req.user._json.id, req.body.frameId, req.body.frameSecret, function(frameId) {
          console.log(frameId);

          if (frameId.err) {
            res.send(JSON.stringify(frame));
          } else if (frameId) {
            res.send(JSON.stringify({
              success: true,
              err: false,
              frameId: frameId
            }));
          } else {
            res.send(JSON.stringify(error(11)));
          }
        });
      } else {
        res.send(JSON.stringify(error(5)));
      }
    });
  } else {
    res.send(JSON.stringify(error(6)));
  }
});

module.exports = router;
