async function find(db, userId) {
  if (!userId) return null;
  return db.userFindById(userId);
}

async function suggestByCriteria(db, criteria, limit = 10) {
  return db.userFindByName(criteria, limit);
}

module.exports = {
  suggestByCriteria,
  find,
};
