const axios = require('axios');
const JAVA_API_BASE_URL = 'http://localhost:3006';
const JAVA_X_TOKEN = 'myToken123';
const JAVA_X_SECRET = 'mySecret456';

module.exports = {

  uploadExpense: async function (req, res) {
    sails.log('From FileController.js: uploadExpense: Received file upload request from frontend.');

    if (!req.session.loggerId) {
      sails.log.warn('From FileController.js: uploadExpense: Unauthorized access attempt (no session).');
      return res.unauthorized('You must be logged in to upload files.');
    }

    if (!req.file) {
      sails.log.error('From FileController.js: uploadExpense: No file uploaded.');
      return res.badRequest('No file was uploaded.');
    }
    req.file('file').upload({
      maxBytes: 3 * 1024 * 1024,
      dirname: require('path').resolve(sails.config.appPath, '.tmp/uploads')
    }, async function whenDone(err, uploadedFiles) {
      if (err) {
        sails.log.error('From FileController.js: uploadExpense: File upload error:', err);
        if (err.code === 'E_EXCEEDS_UPLOAD_LIMIT') {
          return res.status(413).json({ err_message: 'File size exceeds the 3MB limit.' });
        }
        return res.serverError({ err_message: 'Error uploading file to Sails: ' + err.message });
      }

      if (uploadedFiles.length === 0) {
        sails.log.warn('From FileController.js: uploadExpense: No files were uploaded after processing.');
        return res.badRequest('No file was uploaded or processed.');
      }

      const uploadedFile = uploadedFiles[0];
      sails.log.info('From FileController.js: uploadExpense: Successfully received file:', uploadedFile.filename);

      try {
        const fs = require('fs');
        const fileContent = fs.readFileSync(uploadedFile.fd);
        const formData = new FormData();
        const fileBlob = new Blob([fileContent], { type: uploadedFile.type });
        formData.append('file', fileBlob, uploadedFile.filename);

        sails.log.info('From FileController.js: uploadExpense: Forwarding file to Java backend...');
        const javaResponse = await axios.post(`${JAVA_API_BASE_URL}/upload/expense`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Token': JAVA_X_TOKEN,
            'X-Secret': JAVA_X_SECRET,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });

        fs.unlinkSync(uploadedFile.fd);

        sails.log.info('From FileController.js: uploadExpense: Java backend responded:', javaResponse.data);
        return res.ok(javaResponse.data);
      } catch (javaErr) {
        sails.log.error('From FileController.js: uploadExpense: Error forwarding to Java backend:', javaErr.response ? javaErr.response.data : javaErr.message);
        if (uploadedFile && uploadedFile.fd && fs.existsSync(uploadedFile.fd)) {
          fs.unlinkSync(uploadedFile.fd);
        }

        let errorMessage = 'Error processing file with backend service.';
        let statusCode = 500;

        if (javaErr.response) {
          errorMessage = javaErr.response.data.message || javaErr.response.data.error || errorMessage;
          statusCode = javaErr.response.status || statusCode;
        } else if (javaErr.code === 'ECONNREFUSED') {
          errorMessage = 'Could not connect to the Java backend service. Is it running?';
          statusCode = 503;
        } else {
          errorMessage = javaErr.message || errorMessage;
        }

        return res.status(statusCode).json({
          typeoferror: 'Java_Service_Error',
          err_message: errorMessage,
        });
      }
    });
  },
};
