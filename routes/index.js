/**
 * Define all the routes and which scripts control them.
 *
 * Display the home page
 */

var express = require('express');
var router = express.Router();

// Display the home page
router.get('/', function(req, res) {
    res.render('pages/index');
});

module.exports = router;
