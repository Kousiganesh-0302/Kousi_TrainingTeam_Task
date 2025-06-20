// api/policies/isLoggedIn.js
module.exports = async function (req, res, proceed) {

      if (req.session.loggerId) {
      sails.log('From isLoggedIn.js: Policy `isLoggedIn` Success.');
      return proceed();
    }
//     else {
        
//     return res.status(401).json({
//       message: 'You are not logged in. Please authenticate to access this resource.',
//       code: 'E_NOT_LOGGED_IN'
//     });
//    }  

else {
    sails.log('From isLoggedIn.js: Policy `isLoggedIn` failed for user: No sesionId (cleared) or not yet loggedIn.');
    return require('../responses/unauthorized').bind({req, res})({
      // err_message: 'You are not logged in. Please authenticate to access this resource.',
      // typeoferror: 'Node_loggedin_err' // This custom code will be merged by unauthorized.js
    });
  }
  };