const { createRandomString } = require('../util');

const cookieMaxAge = parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10);
const cookieName = process.env.SESSION_COOKIE_NAME;

async function create(db, sessionData = {}) {
  const sessionId = createRandomString(16);
  await db.sessionInsert(sessionId, sessionData);

  // TOOD: make more flexible settings for cookies
  return `${cookieName}=${sessionId}; HttpOnly; SameSite=Lax; Max-Age=${cookieMaxAge}; Path=/`;
}

module.exports = {
  create,
};
