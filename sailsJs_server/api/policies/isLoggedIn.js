module.exports = async function (req, res, proceed) {

  if (req.session.loggerId) {
    sails.log('From isLoggedIn.js: Policy `isLoggedIn` Success.');
    return proceed();
  }
  else {
    sails.log('From isLoggedIn.js: Policy `isLoggedIn` failed for user: No sesionId (cleared) or not yet loggedIn.');
    return require('../responses/unauthorized').bind({ req, res })({});
  }
};
