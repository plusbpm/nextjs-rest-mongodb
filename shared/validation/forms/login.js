const emailSchema = require('../entities/email');
const passwordSchema = require('../entities/password');

const loginSchema = {
  $id: 'form_login',
  type: 'object',
  properties: {
    email: {
      $ref: 'enitity_email#/properties/label',
      messages: {
        required: 'Required field',
      },
    },
    password: {
      $ref: 'enitity_password#/properties/input',
      messages: {
        required: 'Required field',
      },
    },
  },
  required: ['email', 'password'],
};

module.exports = [emailSchema, passwordSchema, loginSchema];
