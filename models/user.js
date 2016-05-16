/**
 * Process all the interactions with the database that involve users
 */

// Get the current user
exports.getUser = function(req, next) {
  // TODO: Add/update user details if necessary
  if (req.user) {
    next(req.user);
  } else {
    next(false);
  }
};
