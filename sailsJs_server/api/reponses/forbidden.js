module.exports = function forbidden(optionalMsg) {

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log('From forbidden.js: Sending 403 ("Forbidden") response', optionalMsg);

  res.status(403);

  let errMsg = {
    statusCode: 403,
    typeoferror: 'Forbidden_err',
    err_message: 'You don\'t have permission to access this resource.'
  };

  const csrfTokenInHeader = req.headers['x-csrf-token'];
  const isCsrfCheckedMethod = ['POST', 'PUT', 'DELETE'].includes(req.method.toUpperCase());

  const isDefaultCsrfErrorMessage = typeof optionalMsg === 'string' && optionalMsg.includes('CSRF mismatch');

  if (isCsrfCheckedMethod && isDefaultCsrfErrorMessage) {
    if (!csrfTokenInHeader) {
      errMsg.typeoferror = 'Csrf_Token_NotInHeader';
      errMsg.err_message = 'CSRF token is missing. Please provide an X-CSRF-Token in the headers.';
    } else {
      errMsg.typeoferror = 'CsrfToken_isInvalid';
      errMsg.err_message = 'CSRF token is invalid or expired. Please get a new token and try again.';
    }
  }

  if (typeof optionalMsg === 'string' && !isDefaultCsrfErrorMessage) {
    errMsg.err_message = optionalMsg;
  } else if (typeof optionalMsg === 'object' && optionalMsg !== null) {
    Object.assign(errMsg, optionalMsg);
  }

  return res.json(errMsg);

};
