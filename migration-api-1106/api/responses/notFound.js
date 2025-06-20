//404

// api/responses/notFound.js
module.exports = function notFound(optionalMsg) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
  
    sails.log('From notFound.js: Sending 404 ("Not Found") response', optionalMsg);
    res.status(404);
  
    let errMsg = {
      statusCode: 404,
      typeoferror: 'Notfound_err',
      err_message: 'The requested resource could not be found.'
    };
  
    if (typeof optionalMsg === 'string') {
      errMsg.err_message = optionalMsg;
    } else if (typeof optionalMsg === 'object' && optionalMsg !== null) {
      Object.assign(errMsg, optionalMsg);
    }
  
    return res.json(errMsg);
  };