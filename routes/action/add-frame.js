/**
 * Authenticate a Facebook login request
 */

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Frames = require('../../models/frames');
var jsonOrRedirect = require('../../helpers/json-or-redirect');
var redirect = '/dashboard';

// Authenticate any requests to '/login/facebook'
router.post('/', function(req, res) {
  if (req.body.frameId && req.body.frameSecret) {
    User.getUser(req, function(user) {
      if (user) {
        Frames.addUserFrame(user._id, req.body.frameId, req.body.frameSecret, function(frameId) {
          if (frameId && frameId.err) {
            if (frameId.err.errCode) {
              jsonOrRedirect(req, res, redirect, frameId.err.errCode);
            } else {
              jsonOrRedirect(req, res, redirect, true);
            }
          } else if (frameId) {
            var json = {
              success: true,
              err: false,
              frameId: frameId
            };

            jsonOrRedirect(req, res, redirect, false, json);

          } else {
            jsonOrRedirect(req, res, redirect, 11);
          }
        });
      } else {
        jsonOrRedirect(req, res, redirect, 5);
      }
    });
  } else {
    jsonOrRedirect(req, res, redirect, 6);
  }
});

module.exports = router;
