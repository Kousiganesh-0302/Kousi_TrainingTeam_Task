// /**
//  * Session Configuration
//  * (sails.config.session)
//  *
//  * Use the settings below to configure session integration in your app.
//  * (for additional recommended settings, see `config/env/production.js`)
//  *
//  * For all available options, see:
//  * https://sailsjs.com/config/session
//  */

// /**
//  * Session configuration
//  * (sails.config.session)
//  */

// module.exports.session = {

//   /***************************************************************************
//   *                                                                          *
//   * Session secret is automatically generated when your new app is created   *
//   * Replace at your own risk in production-- you will invalidate the cookies *
//   * of your users, forcing them to log in again.                             *
//   *                                                                          *
//   ***************************************************************************/
//   secret: '1644f95bcc040b4f3a3fc72c3b2014af',

  

//   /***************************************************************************
//   *                                                                          *
//   * Customize when built-in session support will be skipped.                 *
//   *                                                                          *
//   * (Useful for performance tuning; particularly to avoid wasting cycles on  *
//   * session management when responding to simple requests for static assets, *
//   * like images or stylesheets.)                                             *
//   *                                                                          *
//   * https://sailsjs.com/config/session                                       *
//   *                                                                          *
//   ***************************************************************************/
//   // isSessionDisabled: function (req){
//   //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
//   // },

// };

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

// const redisClient = redis.createClient(6380, '127.0.0.1');
const redisClient = redis.createClient({
  host: '127.0.0.1', // Or your Redis server IP/hostname
  port: 6379,       // Or your Redis server port
  legacyMode: true // Recommended for connect-redis v5+ with redis v4+
});

// Handle Redis client errors
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
  // You might want to implement more robust error handling here
});

module.exports.session = {
  secret: '1644f95bcc040b4f3a3fc72c3b2014af',

  adapter: 'connect-redis',
  store: new RedisStore({
    client: redisClient,
    prefix: 'sess:',
  }),

  resave: false,
  saveUninitialized: false,

  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true
  },
};
