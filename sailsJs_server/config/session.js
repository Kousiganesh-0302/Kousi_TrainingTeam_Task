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

// module.exports.session = {

//   /***************************************************************************
//   *                                                                          *
//   * Session secret is automatically generated when your new app is created   *
//   * Replace at your own risk in production-- you will invalidate the cookies *
//   * of your users, forcing them to log in again.                             *
//   *                                                                          *
//   ***************************************************************************/
//   secret: '8ab018b24ddf0c4574ad8dc0ca516ec2',


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

/**
 * Session Configuration
 * (sails.config.session)
 *
 * For more information on configuring sessions, check out:
 * https://sailsjs.com/config/session
 */

const session = require('express-session');
const redis = require('redis');

const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient(6379, 'localhost');
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected successfully!');
});


module.exports.session = {
  secret: '8ab018b24ddf0c4574ad8dc0ca516ec2',

  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'Lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },

  adapter: 'connect-redis',
  store: new RedisStore({ 
    client: redisClient,
    prefix: 'sess:',
  }),

  resave: false,
  saveUninitialized: false,
};
