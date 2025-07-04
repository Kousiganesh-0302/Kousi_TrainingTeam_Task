// /**
//  * Route Mappings
//  * (sails.config.routes)
//  *
//  * Your routes tell Sails what to do each time it receives a request.
//  *
//  * For more information on configuring custom routes, check out:
//  * https://sailsjs.com/anatomy/config/routes-js
//  */

// module.exports.routes = {

//   /***************************************************************************
//   *                                                                          *
//   * Make the view located at `views/homepage.ejs` your home page.            *
//   *                                                                          *
//   * (Alternatively, remove this and add an `index.html` file in your         *
//   * `assets` directory)                                                      *
//   *                                                                          *
//   ***************************************************************************/

//   '/': { view: 'pages/homepage' },


//   /***************************************************************************
//   *                                                                          *
//   * More custom routes here...                                               *
//   * (See https://sailsjs.com/config/routes for examples.)                    *
//   *                                                                          *
//   * If a request to a URL doesn't match any of the routes in this file, it   *
//   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
//   * not match any of those, it is matched against static assets.             *
//   *                                                                          *
//   ***************************************************************************/


// };

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * For more information on routing, open the online documentation:
 * https://sailsjs.com/docs/concepts/routing
 */

module.exports.routes = {


  'POST /auth/register': { action: 'auth/register' },
  'POST /auth/login': { action: 'auth/login' },
  'POST /auth/logout': { action: 'auth/logout' },
  'GET /csrf-token': 'SecurityController.getCsrfToken',

  'POST /file/upload-expense': 'FileController.uploadExpense',
  '/test': 'TestController.hello',
  '/set-session': 'TestController.setSession',
  '/get-session': 'TestController.getSession',
  'POST /protected-post': 'TestController.protectedPost',
  'GET /protected-resource': 'TestController.protectedResource',
  'GET /users/me': 'TestController.getMe',

  '/': async function (req, res) {
    return res.json({ message: 'Sails app running on port 2025' });
  },
};
