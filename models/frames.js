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
    var query = {users: userId};

    connection(function() {
      Frames.find(query, function(err, frames) {
        if (err) {
          next(error(17, err));
          return false;
        }

        if (frames.length) {
          next(frames);
          return true;
        } else {
          next(false);
          return false;
        }
      });
    });
  } else {
    next(error(18));
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
  // Does the frameId and and frameSecret match the records in the database
  doesFrameIdAndSecretMatchUp(frameId, frameSecret, function(frame) {
    // If the framId and secret is valid
    if (frame && !frame.err) {
      // If the user is not associated with this frame already
      if (frame.users.indexOf(userId) == -1) {
        connection(function() {
          Frames.findOneAndUpdate(
            {_id: frame._id},
            {$push: {users: userId}},
            function(err, frame) {
              if (err) {
                next(error(7, err));
                return false;
              }

              next(frame.frameId);
              return true;
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
};

exports.removeUserFrame = function(userId, frameId, next) {
  if (userId && frameId) {
    var query = {frameId: frameId, users: userId};
    var update = {$pull: {users: userId}};

    connection(function() {
      Frames.findOneAndUpdate(query, update, function(err, frame) {
        if (err) {
          next(error(20, err));
          return false;
        }

        if (frame) {
          next(frame.frameId);
          return true;
        } else {
          next(error(19));
          return false;
        }
      });
    });
  } else {
    next(error(21));
    return false;
  }
};
