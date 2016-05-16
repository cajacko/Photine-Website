/**
 * Process all the interactions with the database that involve users
 */

// Get the current user
exports.getUserFrames = function(userId, next) {
  if (userId) {
    var frames = [
      {frameId: 'do4986b4ndu09nry749'},
      {frameId: 'f9806b598nhfyu985jn'},
      {frameId: 'o38753gb39876b94987'}
    ];
    next(frames);
  } else {
    next(false);
  }
};

exports.addUserFrame = function(userId, frameId, frameSecret, next) {
  // Is user valid
  // Does frameId exist
  // Is frameId and frameSecret valid
  // Is frame already associated with user
  // Add association

  var err = false;

  next(err);
};

exports.removeUserFrame = function(userId, frameId, next) {
  // Is user valid
  // If frame valid
  // Remove association

  next();
};
