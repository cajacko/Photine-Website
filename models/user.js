/**
 * Process all the interactions with the database that involve users
 */

var mongoose = require('mongoose');
var connection = require('./database');
var Schema = mongoose.Schema;
// var framesModel = require('./frames');
// var Frames = framesModel.frames;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  facebookId: {type: String, unique: true},
  displayName: String //,
  // frames: [{type: Schema.Types.ObjectId, ref: 'Frames'}]
},
{
  timestamps: true
});

var User = mongoose.model('users', UserSchema);
exports.user = User;

function registerUser(email, vars, next) {
  // TODO: validate email
  connection(function() {
    var userDetails = {};

    if (email) {
      userDetails.email = email;

      if (vars.id) {
        userDetails.facebookId = vars.id;
      }

      if (vars.name) {
        userDetails.displayName = vars.name;
      }

      if (vars.first_name) {
        userDetails.firstName = vars.first_name;
      }

      if (vars.last_name) {
        userDetails.lastName = vars.last_name;
      }

      var newUser = new User(userDetails);

      newUser.save(function(err, newUser) {
        if (err) {
          next(false);
          return false;
        }

        next(newUser);
      });
    } else {
      next(false);
      return false;
    }
  });
}

function getUserBy(fields, next) {
  var query;

  if (fields.email) {
    query = {email: fields.email};
  } else if (fields.facebookId) {
    query = {facebookId: fields.facebookId};
  } else {
    next(false);
    return false;
  }

  connection(function() {
    User.findOne(query, function(err, user) {
      if (err) {
        next(false);
        return false;
      }

      if (user) {
        next(user);
        return user;
      } else {
        next(false);
        return false;
      }
    });
  });
}

exports.getUserBy = function(fields, next) {
  getUserBy(fields, next);
};

// Get the current user
exports.getUser = function(req, next) {
  if (req.user) {
    var getUserByField;

    if (req.user._json.email) {
      // TODO: validate email
      getUserByField = {email: req.user._json.email};
    } else if (req.user._json.id) {
      getUserByField = {facebookId: req.user._json.id};
    } else {
      next(false);
      return false;
    }

    getUserBy(getUserByField, function(user) {
      if (user) {
        next(user);
        return user;
      } else {
        registerUser(req.user._json.email, req.user._json, function(user) {
          if (user) {
            next(user);
            return user;
          } else {
            next(false);
            return false;
          }
        });
      }
    });
  } else {
    next(false);
    return false;
  }
};
