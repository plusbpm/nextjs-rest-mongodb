async function find(db, userId) {
  if (!userId) return null;
  return db.userFindById(userId);
}

module.exports = {
  find,
};
