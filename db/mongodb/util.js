const { ObjectId } = require('mongodb');

const convertToObjectId = id => {
  try {
    return new ObjectId(id);
  } catch (error) {
    return id;
  }
};

module.exports = {
  convertToObjectId,
};
