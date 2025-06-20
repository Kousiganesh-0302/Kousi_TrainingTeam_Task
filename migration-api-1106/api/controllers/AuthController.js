// // api/controllers/AuthController.js
// module.exports = {

//     /**
//      * `AuthController.register()`
//      * Handles user registration.
//      * Requires CSRF token.
//      */
//     register: async function (req, res) {
//       const { username, password } = req.body;
  
//       if (!username || !password) {
//         return res.badRequest({ message: 'Username and password are required for registration.' });
//       }
  
//       // --- Simulate User Creation (no database for now) ---
//       // In a real app, you'd hash the password and save to a database.
//       // We'll just "register" a user if they match a simple pattern.
//       if (username === 'newuser' && password === 'password123') {
//         // Simulate successful registration AND immediate login
//         req.session.username = username;
//         req.session.userId = Math.floor(Math.random() * 1000000); // Simulate unique ID
//         return res.ok({
//           message: 'Registration successful and user logged in!',
//           user: { username: req.session.username, id: req.session.userId }
//         });
//       } else {
//         return res.badRequest({ message: 'Registration failed: Verify with existing usename and password.' });
//       }
//     },
  
//     /**
//      * `AuthController.login()`
//      * Handles user login.
//      * Requires CSRF token.
//      */
//     login: async function (req, res) {
//       const { username, password } = req.body;
  
//       if (!username || !password) {
//         return res.badRequest({ message: 'Username and password are required for login.' });
//       }
  
//       // --- Simulate User Authentication (no database for now) ---
//       // In a real app, you'd fetch user from DB, hash and compare password.
//       if (username === 'Kousalya' && password === 'saas123') { // Example credentials
//         req.session.username = username;
//         req.session.userId = 2121975; // Use the ID from our previous session tests for consistency
  
//         // Explicitly save the session if relying on auto-save
//         await req.session.save(); // ensure session is saved before response
  
//         return res.ok({
//           message: 'Login successful!',
//           user: { username: req.session.username, id: req.session.userId }
//         });
//       } else {
//         // Failed login
//         return res.unauthorized({ message: 'Invalid username or password.' });
//       }
//     },
  
//     /**
//      * `AuthController.logout()`
//      * Handles user logout.
//      * Requires CSRF token.
//      */
//     logout: async function (req, res) {
//       req.session.destroy((err) => {
//         if (err) {
//           console.error('Session destroy error:', err);
//           return res.serverError('Could not log out at this time.');
//         }
//         res.ok({ message: 'Logged out successfully.' });
//       });
//     },
  
//   };

// api/controllers/AuthController.js
module.exports = {

    //AuthController.register() , Handles user registration, Requires CSRF token.

    register: async function (req, res) {
      sails.log('From AuthController.js: register: Requested for register.');
      const { loggername, loggerpwd } = req.body;
  
      if (!loggername || !loggerpwd) {
        sails.log('From AuthController.js: register: Invalid Credentials.');
        return res.badRequest({
            typeoferror: 'Missing_Credentials_err',
            err_message: 'Username and password are required for registration.'
          });      
    }
  
      // User Creation (no database for now) , "register" a user if they match loggername,password below
      if (loggername === 'newuser' && loggerpwd === 'password123') {
        sails.log('From AuthController.js: register: Registration Success.');
        // Simulate successful registration AND immediate login
        req.session.loggername = loggername;
        req.session.loggerId = Math.floor(Math.random() * 1000000); // Simulate unique ID
        return res.ok({
          err_message: 'Registration successful and user logged in!',
          user: { loggername: req.session.loggername, id: req.session.loggerId }
        });
      } 
      else {
        sails.log('From AuthController.js: register: Registration Failed.');
        return res.badRequest({
            typeoferror: 'Resgistration_Failed_err',
            err_message: 'Registration failed: Register with newuser password123.'
        });     
         }
    },
  
    //AuthController.login()`Handles user login. Requires CSRF token.
     
    login: async function (req, res) {
      sails.log('From AuthController.js: login: Requested for login.');

      const { loggername, loggerpwd } = req.body;
  
      if (!loggername || !loggerpwd) {
        sails.log('From AuthController.js: login: Invalid Credentials.');
        return res.badRequest({
            typeoferror: 'Missing_Credentials_err',
            err_message: 'Loggername and password are required for login.'
          });      
        }
  
      // Simulate User Authentication (no database for now) 
      if (loggername === 'Kousalya' && loggerpwd === 'saas123') { // Example credentials
        sails.log('From AuthController.js: login: Login Success.');
        req.session.loggername = loggername;
        req.session.loggerId = 2121975; // Use the ID from our previous session tests for consistency
  
        // Explicitly save the session if relying on auto-save
        await req.session.save(); // ensure session is saved before response
  
        return res.ok({
          err_message: 'Login successful!',
          user: { loggername: req.session.loggername, id: req.session.loggerId }
        });
      } else {
        sails.log('From AuthController.js: login: Login Failed.');
        // Failed login
        return res.unauthorized({ err_message: 'Invalid loggername or password.' });
      }
    },
  
    //`AuthController.logout()` Handles user logout. Requires CSRF token.
     
    logout: async function (req, res) {
      sails.log('From AuthController.js: logout: Requested for logout.');
      req.session.destroy((err) => {
        if (err) {
          sails.log('From AuthController.js: logout: Could Not logout.');
          console.error('Session destroy error:', err);
          return res.serverError('Could not log out at this time.');
        }
        sails.log('From AuthController.js: logout: Logout success.. cookies ended.');
        res.ok({ err_message: 'Logged out successfully.' });
      });
    },
  
  };