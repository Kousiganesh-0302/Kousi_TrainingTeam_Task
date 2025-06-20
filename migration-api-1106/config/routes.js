/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

// module.exports.routes = {
  
//   '/test': 'TestController.hello',

//   '/': async function (req, res) {
//     return res.json({ message: 'Sails app running on port 2025' });
//   },

//   '/set-session': async function (req, res) {
//   req.session.cookie.maxAge = 24 * 60 * 60 * 1000; // 1 day
//   req.session.username = 'Kousalya';
//     req.session.save((err) => {
//     if (err) {
//       sails.log.error('Session save error:', err);
//       return res.serverError(err);
//     }
//     return res.json({ message: 'Session data set.', cookie: req.session.cookie });
//   });
// },


//   '/get-session': async function (req, res) {
//     console.log('Session object:', req.session);
//     return res.json({ session: req.session });
//   },

//   '/csrf-token': {
//   controller: 'SecurityController',
//   action: 'getCsrfToken',
//   method: 'GET'
// }

// };

// config/routes.js
module.exports.routes = {

  '/test': 'TestController.hello',

  '/': async function (req, res) {
    return res.json({ message: 'Sails app running on port 2025' });
  },
  '/set-session': 'TestController.setSession',
  '/get-session': 'TestController.getSession',
  'GET /csrf-token': 'SecurityController.getCsrfToken',
  'POST /protected-post': 'TestController.protectedPost',
  'GET /protected-resource': 'TestController.protectedResource',
  'POST /auth/register': 'AuthController.register',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/logout': 'AuthController.logout',
  'GET /users/me': 'TestController.getMe',
};