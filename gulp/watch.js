var config = require('../config.json');

module.exports = function(gulp) {
  gulp.task(config.gulpTasks.watch, function() {
    gulp.watch([config.sass.dir + '**/*.scss'], [config.gulpTasks.sass]);
    gulp.watch([config.js.dir + '**/*.js'], [config.gulpTasks.javascripts]);
  });
};
