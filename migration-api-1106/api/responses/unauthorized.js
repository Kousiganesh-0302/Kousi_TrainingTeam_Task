// api/responses/unauthorized.js
//401

module.exports = function unauthorized(optionalMsg) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
  
    sails.log('From unauthorized.js: Sending 401 ("Unauthorized") response', optionalMsg);
    res.status(401);
  
    let errMsg = {
      statusCode: 401,
      typeoferror: 'Unauthorized_err',
      err_message: 'You are not authorized to perform this action.',
      description: 'Your Cookies Expired or Cleared / You are not yet LoggedIn',
    };
  
    if (typeof optionalMsg === 'string') {
      errMsg.err_message = optionalMsg;
    } else if (typeof optionalMsg === 'object' && optionalMsg !== null) {
      Object.assign(errMsg, optionalMsg);
    }
  
    return res.json(errMsg);
  };