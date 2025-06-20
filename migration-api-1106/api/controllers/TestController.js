/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


// module.exports = {
 


//   /**
//    * `TestController.hello()`
//    */
//   hello: async function (req, res) {
//     return res.json({
//       todo: 'hello() is not implemented yet!'
//     });
//   }


// };

// api/controllers/TestController.js
module.exports = {

  // `TestController.setSession()`Sets a username in the session and sends the session cookie.
   
  hello: async function (req, res) {
    return res.json({
      todo: 'hello() is not implemented yet!'
    });
  },

  setSession: async function (req, res) {
    // Set a value on the session object
    sails.log('From TesController.js: setSession: Requested for setSession.');
    req.session.loggername = 'Kousalya';
    req.session.loggerId = 2121975;

    // Save the session explicitly (optional, but good for clarity)
    req.session.save((err) => {
      if (err) {
        sails.log.error('From TesController.js: setSession: Session error', err);
        return res.serverError(err);
      }
      // Send a success response. The session cookie will be in the 'Set-Cookie' header.
      sails.log('From TesController.js: setSession: Set Session Success');
      return res.json({
        err_message: 'Session data set.',
        loggername: req.session.loggername,
        cookieMaxAge: req.session.cookie.maxAge // Confirm maxAge
      });
    });
  },

  //`TestController.getSession()` Retrieves and returns session data.
   
  getSession: async function (req, res) {
    // Access session data
    sails.log('From TesController.js: getSession: Requested for get Session');
    const loggername = req.session.loggername;
    const loggerId = req.session.loggerId;

    sails.log.info('From TesController.js: getSession: Retrieved session:', req.session); // Log full session object
    return res.json({
      err_message: 'Session data retrieved.',
      session: {
        loggername: loggername,
        loggerId: loggerId,
        cookie: req.session.cookie // See current cookie properties
      }
    });
  },

  protectedPost: async function (req, res) {
    // If we reach here, the CSRF token has been successfully validated by Sails.js.
    sails.log('From TesController.js: protectedPost: Requested for protectedPost...See the Response for update');
    const requestData = req.body;
    return res.json({
      err_message: 'This POST request was successful and CSRF token was validated!',
      receivedData: requestData,
    }); 
  },

  // Enpoint that should only be accessible when logged in
  protectedResource: async function (req, res) {
    // If I reach here, the isLoggedIn policy has passed.
    sails.log('From TesController.js: protectedPost: Requested for protectedResource..See the Response for update');
    return res.json({
      err_message: 'Welcome! You have successfully accessed a protected resource.',
      yourSessionData: {
        loggername: req.session.loggername,
        loggerId: req.session.loggerId
      }
    });
  },

  getMe: async function (req, res) {
    // If I reach here, the user is logged in due to the isLoggedIn policy.
    sails.log('From TesController.js: getMe: Requested for getMe..See the Response for update');
    return res.json({
      err_message: 'Your profile data:',
      profile: {
        loggername: req.session.loggername,
        loggerId: req.session.loggerId,
      }
    });
  },
};
