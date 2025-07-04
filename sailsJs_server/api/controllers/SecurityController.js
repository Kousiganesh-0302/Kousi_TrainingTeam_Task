module.exports = {
  getCsrfToken: function (req, res) {
    sails.log('From SecurityController.js: getCsrfToken: Requested for CSRF token.');
    const csrfToken = req.csrfToken();
    if (!csrfToken) {
      sails.log.error('From SecurityController.js: getCsrfToken: Failed to generate CSRF token.');
      return res.serverError({ err_message: 'Failed to generate CSRF token.' });
    }
    return res.json({ _csrf: csrfToken });
  }

};
