const jwt = require('jsonwebtoken');
const { configs } = require('../config');

const signToken = (payload) => {
  const token = jwt.sign(
    { id: payload.id, role: payload.role },
    configs.jwt.secret,
    {
      expiresIn: configs.jwt.expires_in,
    }
  );
  return token;
};

module.exports = { signToken };