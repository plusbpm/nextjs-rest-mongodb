const { ObjectId } = require('mongodb');

const convertToObjectId = id => {
  try {
    return new ObjectId(id);
  } catch (error) {
    return id;
  }
};

const twoDigits = num => (num < 10 ? `0${num}` : num);

module.exports = {
  convertToObjectId,
  twoDigits,
};
