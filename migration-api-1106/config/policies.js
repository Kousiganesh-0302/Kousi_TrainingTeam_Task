// /**
//  * Policy Mappings
//  * (sails.config.policies)
//  *
//  * Policies are simple functions which run **before** your actions.
//  *
//  * For more information on configuring policies, check out:
//  * https://sailsjs.com/docs/concepts/policies
//  */

const AuthController = require("../api/controllers/AuthController");
const TestController = require("../api/controllers/TestController");

// module.exports.policies = {

//   /***************************************************************************
//   *                                                                          *
//   * Default policy for all controllers and actions, unless overridden.       *
//   * (`true` allows public access)                                            *
//   *                                                                          *
//   ***************************************************************************/

//   // '*': true,

// };

module.exports.policies = {
  '*': true,

  TestController: {
    protectedResource: 'isLoggedIn',

    getMe: 'isLoggedIn',
  },

  AuthController: {

  }
};