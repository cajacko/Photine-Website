var browserSync = require('browser-sync');
var config = require('../config.json');

module.exports = function(gulp) {
  gulp.task(config.gulpTasks.browserSync, [config.gulpTasks.nodemon], function() {
    browserSync.init(null, {
      proxy: config.browserSync.proxy,
      files: [config.publicDir + '**/*.*'],
      port: config.browserSync.port
    });
  });
};
