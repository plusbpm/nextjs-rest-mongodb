const { createRandomString } = require('../util');

const cookieName = process.env.SESSION_COOKIE_NAME;

async function create(db, sessionData = {}) {
  const sessionId = createRandomString(16);
  await db.sessionInsert(sessionId, sessionData);
  // https://github.com/fastify/fastify-cookie#sending
  return [cookieName, sessionId, { httpOnly: true, sameSite: 'lax', path: '/' }];
}

async function destroy(db, sessionId) {
  await db.sessionRemove(sessionId);
  // https://github.com/fastify/fastify-cookie#clearing
  return [cookieName, {}];
}

async function find(db, sessionId) {
  const sessionDoc = await db.sessionFindById(sessionId);
  return sessionDoc;
}

async function touch(db, sessionId) {
  await db.sessionTouch(sessionId);
  return null;
}

module.exports = {
  cookieName,
  create,
  destroy,
  find,
  touch,
};
