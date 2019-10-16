const expireAfterSeconds = parseInt(process.env.SESSION_EXPIRE_AGE_SEC, 10);

module.exports = [
  {
    key: { created: 1 },
    background: true,
    expireAfterSeconds,
  },
];
