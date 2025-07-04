const bcrypt = require('bcrypt');

module.exports = {

  register: async function (req, res) {
    sails.log('From AuthController.js: register: Requested for register.');
    const { loggername, email, loggerpwd, confirmPassword } = req.body;

    if (!loggername || !email || !loggerpwd || !confirmPassword) {
      sails.log('From AuthController.js: register: Invalid Credentials - Missing fields.');
      return res.status(400).json({
        typeoferror: 'Missing_Credentials_err',
        err_message: 'Username, email, password, and confirm password are required for registration.'
      });
    }

    if (loggerpwd !== confirmPassword) {
      sails.log('From AuthController.js: register: Passwords do not match.');
      return res.status(400).json({
        typeoferror: 'Password_Mismatch_err',
        err_message: 'Passwords do not match.'
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(loggerpwd, 10);

      const newUser = await User.create({
        username: loggername,
        email: email,
        password: hashedPassword,
      }).fetch();

      sails.log('From AuthController.js: register: Registration Success. User ID:', newUser.id);

      req.session.loggername = newUser.username;
      req.session.loggerId = newUser.id;
      req.session.email = newUser.email;

      await req.session.save();

      return res.ok({
        err_message: 'Registration successful and user logged in!',
        user: { loggername: newUser.username, id: newUser.id, email: newUser.email }
      });

    } catch (err) {
      sails.log.error('From AuthController.js: register: Registration Failed:', err);
      if (err.code === 'E_UNIQUE') {
        if (err.raw && err.raw.sqlMessage && err.raw.sqlMessage.includes('Duplicate entry')) {
          if (err.raw.sqlMessage.includes('loggername')) {
            return res.status(409).json({ typeoferror: 'Username_Exists_err', err_message: 'Username already taken.' });
          }
          if (err.raw.sqlMessage.includes('email')) {
            return res.status(409).json({ typeoferror: 'Email_Exists_err', err_message: 'Email already registered.' });
          }
        }
        return res.status(409).json({ typeoferror: 'Duplicate_Entry_err', err_message: 'A user with this username or email already exists.' });
      }
      return res.serverError({
        typeoferror: 'Server_Error',
        err_message: 'An unexpected error occurred during registration.'
      });
    }
  },


  login: async function (req, res) {
    sails.log('From AuthController.js: login: Requested for login.');

    const { email, loggerpwd } = req.body;

    if (!email || !loggerpwd) {
      sails.log('From AuthController.js: login: Invalid Credentials - Missing fields.');
      return res.badRequest({
        typeoferror: 'Missing_Credentials_err',
        err_message: 'Email and password are required for login.'
      });
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        sails.log('From AuthController.js: login: User not found for email:', email);
        return res.status(401).json({
          typeoferror: 'Unauthorized_err',
          err_message: 'Invalid email or password.',
          description: 'User not found.'
        });
      }

      const passwordMatch = await bcrypt.compare(loggerpwd, user.password);

      if (!passwordMatch) {
        sails.log('From AuthController.js: login: Password mismatch for user:', email);
        return res.status(401).json({
          typeoferror: 'Unauthorized_err',
          err_message: 'Invalid email or password.',
          description: 'Password mismatch.'
        });
      }

      sails.log('From AuthController.js: login: Login Success for user:', user.username); // Log username for clarity

      req.session.loggername = user.username;
      req.session.loggerId = user.id;
      req.session.email = user.email;

      await req.session.save();

      return res.ok({
        err_message: 'Login successful!',
        user: { loggername: user.username, id: user.id, email: user.email }
      });

    } catch (err) {
      sails.log.error('From AuthController.js: login: Login Failed:', err);
      return res.serverError({
        typeoferror: 'Server_Error',
        err_message: 'An unexpected error occurred during login.'
      });
    }
  },


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
