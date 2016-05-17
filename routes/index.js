/**
 * Define all the routes and which scripts control them.
 *
 * Display the home page
 */

var express = require('express');
var router = express.Router();

router.use('/login/facebook', require('./login/facebook')); // Facebook login redirect
router.use('/login/callback/facebook', require('./callback/facebook')); // Facebook login redirect
router.use('/dashboard', require('./dashboard')); // Facebook login redirect
router.use('/action/remove-frame', require('./action/remove-frame')); // Facebook login redirect
router.use('/action/add-frame', require('./action/add-frame')); // Facebook login redirect

// Display the home page
router.get('/', function(req, res) {
  res.render('pages/home');
});

module.exports = router;
