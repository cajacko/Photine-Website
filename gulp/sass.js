var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config.json');
var sassOutput = './' + config.publicDir + config.sass.export;

module.exports = function(gulp) {
  gulp.task(config.gulpTasks.sass, function() {
    return gulp.src(config.sass.dir + config.sass.import)
      .pipe(sass().on('error', sass.logError))
      .pipe(rename(config.sass.mainOutputFile))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(sassOutput))
      .pipe(rename(config.sass.minOutputFile))
      .pipe(minifyCss())
      .pipe(gulp.dest(sassOutput));
  });
};
