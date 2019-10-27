const dotenv = require('dotenv-safe');

const { error } = dotenv.config({ allowEmptyValues: true });
if (error) throw error;
