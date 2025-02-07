const { verify } = require('jsonwebtoken');
const { configs } = require('../config');

const verifyToken = (token) => {
  const decoded = verify(token, configs.jwt.secret);
  
  // Assuming the token contains 'id' and 'role' fields
  return {
    id: decoded.id,
    role: decoded.role,
  };
};

module.exports = { verifyToken };
