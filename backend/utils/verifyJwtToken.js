const { verify } = require('jsonwebtoken');
const { configs } = require('../config');

const verifyToken = (token) => {
  try {
    const decoded = verify(token, configs.jwt.secret); 
    return {
      id: decoded.id,
      role: decoded.role,
    };
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

module.exports = { verifyToken };
