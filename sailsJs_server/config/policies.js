/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': true,
  TestController: {
    protectedResource: 'isLoggedIn',
    getMe: 'isLoggedIn',
    protectedPost: 'isLoggedIn',
  },

  AuthController: {
    register: true,
    login: true,
    logout: 'isLoggedIn',
    getCsrfToken: true,
  },
  
  FileController: {
    uploadExpense: 'isLoggedIn',
  },
};
