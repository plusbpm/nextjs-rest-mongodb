async function findByEmail(db, email) {
  return db.findByUser(email);
}

module.exports = {
  findByEmail,
};
