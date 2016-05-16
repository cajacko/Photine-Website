/**
 * Process all the interactions with the database that involve users
 */

var mongoose = require('mongoose');
var connection = require('./database');
var Schema = mongoose.Schema;
var userModel = require('./user');
var User = userModel.user;

var FramesSchema = new Schema({
  frameId: {type: String, unique: true},
  frameSecret: String,
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
},
{
  timestamps: true
});

FramesSchema.index({frameId: 1, frameSecret: 1}, {unique: true});

var Frames = mongoose.model('frames', FramesSchema);
exports.frames = Frames;

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

function doesFrameIdAndSecretMatchUp(frameId, frameSecret, next) {

}

exports.addUserFrame = function(userId, frameId, frameSecret, next) {
  // Is user valid
  // Does frameId exist
  // Is frameId and frameSecret valid
  // Is frame already associated with user
  // Add association

  if (userId && frameId && frameSecret) {
    userModel.getUserBy({facebookId: userId}, function(user) {
      if (user) {
        doesFrameIdAndSecretMatchUp(frameId, frameSecret, function(frameUsers) {
          if (frameUsers) {
            // TODO: If user is already associated with the frame
            if (false) {
              next(false);
              return false;
            } else {
              connection(function() {
                Frames.update(
                  {frameId: frameId},
                  {$push: {users: {title: title, msg: msg}}},
                  function(err, newUser) {
                    if (err) {
                      next(false);
                      return false;
                    }

                    next(newUser);
                });
              });
            }
          } else {
            next(false);
            return false;
          }
        });
      } else {
        next(false);
        return false;
      }
    });
  } else {
    next(false);
    return false;
  }
};

exports.removeUserFrame = function(userId, frameId, next) {
  // Is user valid
  // If frame valid
  // Remove association

  next();
};
