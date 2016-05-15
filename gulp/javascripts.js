var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config.json');
var jsOutput = './' + config.publicDir + config.js.export;

module.exports = function(gulp) {
  gulp.task(config.gulpTasks.javascripts, function() {
    return browserify(config.js.dir + config.js.import)
      .bundle() // Compile the js
      .pipe(source(config.js.mainOutputFile)) //Pass desired output filename to vinyl-source-stream
      .pipe(gulp.dest(jsOutput)) // Output the file
      .pipe(buffer()) // convert from streaming to buffered vinyl file object
      .pipe(rename(config.js.minOutputFile)) // Rename the minified version
      .pipe(uglify()) // Minify the file
      .pipe(gulp.dest(jsOutput)); // Output the minified file
  });
};
