/**
 * Process all the interactions with the database that involve users
 */

var mongoose = require('mongoose');
var connection = require('./database');
var Schema = mongoose.Schema;
var userModel = require('./user');
var User = userModel.user;
var error = require('../helpers/errors');

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
    next(error(10));
  }
};

function doesFrameIdAndSecretMatchUp(frameId, frameSecret, next) {
  var query = {frameId: frameId, frameSecret: frameSecret};

  connection(function() {
    Frames.findOne(query, function(err, frame) {
      if (err) {
        next(error(8, err));
        return false;
      }

      if (frame) {
        next(frame);
        return frame;
      } else {
        next(error(9));
        return false;
      }
    });
  });
}

exports.addUserFrame = function(userId, frameId, frameSecret, next) {
  // If the userId, frameId and frameSecret are set
  if (userId && frameId && frameSecret) {
    // Get the user by facebookID
    userModel.getUserBy({facebookId: userId}, function(user) {
      // If the user exists
      if (user) {
        // Does the frameId and and frameSecret match the records in the database
        doesFrameIdAndSecretMatchUp(frameId, frameSecret, function(frame) {
          // If the framId and secret is valid
          if (frame) {
            // If the user is not associated with this frame already
            if (frame.users.indexOf(user._id) == -1) {
              connection(function() {
                Frames.findOneAndUpdate(
                  {_id: frame._id},
                  {$push: {users: user._id}},
                  function(err, frame) {
                    if (err) {
                      next(error(7, err));
                      return false;
                    }

                    next(frame.frameId);
                    return frame.frameId;
                  });
              });
            } else {
              next(error(1));
              return false;
            }
          } else {
            next(error(2));
            return false;
          }
        });
      } else {
        next(error(3));
        return false;
      }
    });
  } else {
    next(error(4));
    return false;
  }
};

exports.removeUserFrame = function(userId, frameId, next) {
  // Is user valid
  // If frame valid
  // Remove association

  next();
};
