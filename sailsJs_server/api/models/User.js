module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'id',
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'loggername',
      maxLength: 50,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 100,
    },
    password: {
      type: 'string',
      required: true,
      protect: true,
    },
  },
};
