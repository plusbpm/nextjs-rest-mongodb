const [emailSchema, passwordSchema, loginSchema] = require('./login');

const userSchema = require('../entities/user');

const registerSchema = {
  $id: 'form_register',
  type: 'object',
  properties: {
    ...loginSchema.properties,
    name: {
      $ref: 'enitity_user#/properties/name',
      messages: {
        required: 'Required field',
      },
    },
    repeat: {
      type: 'string',
      const: { $data: '1/password' },
      messages: {
        required: 'Required field',
        const: 'Password replay does not match',
      },
    },
  },
  required: ['name', 'email', 'password', 'repeat'],
};

module.exports = [emailSchema, passwordSchema, userSchema, registerSchema];
