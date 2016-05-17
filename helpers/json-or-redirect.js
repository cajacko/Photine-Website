module.exports = function jsonOrRedirect(req, res, redirect, errCode, json) {
  if (req.query.json) {
    res.setHeader('Content-Type', 'application/json');
    if (errCode) {
      res.send(JSON.stringify(error(errCode)));
    } else {
      res.send(JSON.stringify(json));
    }
  } else {
    var redirectUrl = redirect;

    if (errCode) {
      redirectUrl += '/?err=' + errCode;
    }

    res.redirect(redirectUrl);
  }
};
