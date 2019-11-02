const validDigits = input => {
  if (input.length === 0) return true;
  return /^[0-9]*$/.test(input);
};

const validate = (precision, data) => {
  const trimmedData = data.trim();

  if (/(.*\..*){2,}/.test(trimmedData)) {
    validate.errors = [
      {
        keyword: 'exactDecimal',
        message: 'Сan contain only one dot',
        params: {},
      },
    ];
    return false;
  }

  const [whole, decimal = ''] = trimmedData.split('.');
  if (!validDigits(whole) || !validDigits(decimal)) {
    validate.errors = [
      {
        keyword: 'exactDecimal',
        message: 'Only digits and one dot allowed',
        params: {},
      },
    ];
    return false;
  }

  if (decimal.length > precision) {
    validate.errors = [
      {
        keyword: 'exactDecimal',
        message: `Precision limit exceeded, max is ${precision}, found ${decimal.length}`,
        params: {},
      },
    ];
    return false;
  }

  return true;
};

module.exports = [
  'exactDecimal',
  {
    type: 'string',
    validate,
    errors: true,
    metaSchema: {
      type: 'number',
      minimum: 1,
      maximum: 16, // JS Float max precision (not exactly)
      multipleOf: 1,
    },
  },
];
