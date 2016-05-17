function defineError(errCode, errAction, errTitle, errMessage) {
  var error = {
    err: true
  };

  if (errAction) {
    error.errAction = errAction;
  } else {
    error.errAction = 'Undefined action';
  }

  if (errCode) {
    error.errCode = errCode;
  } else {
    error.errCode = 'Undefined error code';
  }

  if (errTitle) {
    error.errTitle = errTitle;
  } else {
    error.errTitle = 'Undefined error title';
  }

  if (errMessage) {
    error.errMessage = errMessage;
  } else {
    error.errMessage = 'Undefined error message';
  }

  return error;
}

module.exports = function(errCode, misc) {
  var error;

  console.log(misc);

  if (errCode) {
    switch (errCode) {
      case 11:
        error = defineError(errCode, 'Possibly failed to associate frame and user', 'The action was successful but the frame Id was not returned', 'Something unusual has gone on.');
        break;
      case 10:
        error = defineError(errCode, 'Failed to get users frames', 'The userID parameter was not set');
        break;
      case 9:
        error = defineError(errCode, 'Frame ID/Secret Association failed', 'The frame Id and frame secret do not match');
        break;
      case 8:
        error = defineError(errCode, 'Frame ID/Secret Association failed', 'There was an error getting the association in the database', 'There was an error getting the association in the database. Check logs for more details.');
        break;
      case 7:
        error = defineError(errCode, 'Failed to associate frame and user', 'There was an error saving the association in the database', 'There was an error saving the association in the database. Check logs for more details.');
        break;
      case 6:
        error = defineError(errCode, 'Failed to associate frame and user', 'No data was posted', 'No POST data was sent to the server');
        break;
      case 5:
        error = defineError(errCode, 'Failed to associate frame and user', 'The user is not signed in', 'You must be signed in to perform this action.');
        break;
      case 4:
        error = defineError(errCode, 'Failed to associate frame and user', 'Not all the paramaters are set', 'The user ID, frame ID and frame secret must be set.');
        break;
      case 3:
        error = defineError(errCode, 'Failed to associate frame and user', 'The given user does not exist', 'The given user does not exist, perhaps you are not signed in?');
        break;
      case 2:
        error = defineError(errCode, 'Failed to associate frame and user', 'Frame ID and secret are invalid', 'The given frame ID and frame secret do not match.');
        break;
      case 1:
        error = defineError(errCode, 'Failed to associate frame and user', 'User already associated with frame', 'The given user is already associated with the specified frame. No action was taken.');
        break;
      default:
        error = defineError(errCode);
    }
  } else {
    error = defineError();
  }

  console.log(error);
  return error;
}
