var gulp = require('gulp');

// Compile and minify sass
require('./gulp/sass')(gulp);

// Compile and minify javascripts
require('./gulp/javascripts')(gulp);

// Use browser sync to reload and inject changes to the browser as we're developing
require('./gulp/browser-sync')(gulp);

// Nodemon restarts the nodejs dev server on file changes
require('./gulp/nodemon')(gulp);

// Trigger other tasks when changes to files occur
require('./gulp/watch')(gulp);

// This runs and watches everything, use this for development
require('./gulp/default')(gulp);
