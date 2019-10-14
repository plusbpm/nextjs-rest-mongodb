const { createRandomString } = require('../util');

const cookieMaxAge = parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10);
const cookieName = process.env.SESSION_COOKIE_NAME;

async function create(db, sessionData = {}) {
  const sessionId = createRandomString(16);
  await db.sessionInsert(sessionId, { ...sessionData, created: new Date() });
  // https://github.com/fastify/fastify-cookie#sending
  return [
    cookieName,
    sessionId,
    { maxAge: cookieMaxAge, httpOnly: true, sameSite: 'lax', path: '/' },
  ];
}

async function destroy(db, sessionId) {
  await db.sessionRemove(sessionId);
  // https://github.com/fastify/fastify-cookie#clearing
  return [cookieName, {}];
}

async function find(db, sessionId) {
  const sessionDoc = await db.sessionFindById(sessionId);
  return (sessionDoc && sessionDoc.userId) || null;
}

module.exports = {
  cookieName,
  create,
  destroy,
  find,
};
