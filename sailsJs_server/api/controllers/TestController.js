module.exports = {

  hello: async function (req, res) {
    return res.json({
      todo: 'hello() is not implemented yet!'
    });
  },

  setSession: async function (req, res) {
    sails.log('From TesController.js: setSession: Requested for setSession.');
    req.session.loggername = 'Kousalya';
    req.session.loggerId = 2121975;

    req.session.save((err) => {
      if (err) {
        sails.log.error('From TesController.js: setSession: Session error', err);
        return res.serverError(err);
      }
      sails.log('From TesController.js: setSession: Set Session Success');
      return res.json({
        err_message: 'Session data set.',
        loggername: req.session.loggername,
        cookieMaxAge: req.session.cookie.maxAge
      });
    });
  },

  getSession: async function (req, res) {
    sails.log('From TesController.js: getSession: Requested for get Session');
    const loggername = req.session.loggername;
    const loggerId = req.session.loggerId;

    sails.log.info('From TesController.js: getSession: Retrieved session:', req.session);
    return res.json({
      err_message: 'Session data retrieved.',
      session: {
        loggername: loggername,
        loggerId: loggerId,
        cookie: req.session.cookie
      }
    });
  },

  protectedPost: async function (req, res) {
    sails.log('From TesController.js: protectedPost: Requested for protectedPost...See the Response for update');
    const requestData = req.body;
    return res.json({
      err_message: 'This POST request was successful and CSRF token was validated!',
      receivedData: requestData,
    });
  },

  protectedResource: async function (req, res) {
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
    sails.log('From TesController.js: getMe: Requested for getMe..See the Response for update');
    return res.json({
      err_message: 'Your profile data:',
      profile: {
        loggername: req.session.loggername,
        loggerId: req.session.loggerId,
        email: req.session.email,
      }
    });
  },
};
