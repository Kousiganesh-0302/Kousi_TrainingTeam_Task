// api/responses/badRequest.js
//400


module.exports = function badRequest(optionalMsg) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
  
    sails.log('From badRequest.js: Sending 400 ("Bad Request") response', optionalMsg);
    res.status(400);
  
    let errMsg = {
      statusCode: 400,
      typeoferror: 'Bad_Resquest_Err',
      err_message: 'The request was malformed or missing required parameters.'
    };
  
    if (typeof optionalMsg === 'string') {
      errMsg.err_message = optionalMsg;
    } else if (typeof optionalMsg === 'object' && optionalMsg !== null) {
      Object.assign(errMsg, optionalMsg);
    }
  
    return res.json(errMsg);
  };