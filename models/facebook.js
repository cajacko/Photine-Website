/**
 * Authenticate a Facebook login request
 */

var config = require('../config.json');
var FB = require('fb');

var facebookCallback = 'http://localhost:' + config.browserSync.port + config.facebook.callback;

FB.options({
  appId:          config.facebook.clientID,
  appSecret:      config.facebook.clientSecret,
  redirectUri:    facebookCallback
});

exports.facebookLoginUrl = function() {
  return FB.getLoginUrl({scope: 'email, user_photos'});
};

exports.facebookAccessToken = function(res, code, next) {
  FB.api('oauth/access_token', {
    client_id: config.facebook.clientID,
    client_secret: config.facebook.clientSecret,
    redirect_uri: facebookCallback,
    code: code
  }, function(res) {
    if (!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }

    var accessToken = res.access_token;
    var expires = res.expires ? res.expires : 0;

    next(accessToken, expires);
  });
};
