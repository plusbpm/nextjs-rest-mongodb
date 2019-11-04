async function find(db, userId) {
  if (!userId) return null;
  return db.userFindById(userId);
}

async function suggestByCriteria(db, userId, criteria, limit = 10) {
  return db.userFindByName(userId, criteria, limit);
}

module.exports = {
  suggestByCriteria,
  find,
};
