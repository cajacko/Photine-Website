var nodemon = require('gulp-nodemon');
var config = require('../config.json');

module.exports = function(gulp) {
  gulp.task(config.gulpTasks.nodemon, function(cb) {
    var started = false;

    return nodemon({
      script: './bin/www',
      env: {'NODE_ENV': 'development'},
      ignore: [
        config.js.dir + '**/*.js',
        './' + config.publicDir,
        './gulpfile.js'
      ]
    }).on('start', function() {
      if (!started) {
        cb();
        started = true;
      }
    });
  });
};
