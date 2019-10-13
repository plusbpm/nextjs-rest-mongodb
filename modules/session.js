const { createRandomString } = require('../util');

const cookieMaxAge = parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10);
const cookieName = process.env.SESSION_COOKIE_NAME;

async function create(db, sessionData = {}) {
  const sessionId = createRandomString(16);
  await db.sessionInsert(sessionId, sessionData);
  // https://github.com/fastify/fastify-cookie#sending
  return [cookieName, sessionId, { maxAge: cookieMaxAge, httpOnly: true, sameSite: 'lax' }];
}

async function destroy(db, sessionId) {
  await db.sessionRemove(sessionId);
  // https://github.com/fastify/fastify-cookie#clearing
  return [cookieName, {}];
}

module.exports = {
  cookieName,
  create,
  destroy,
};
