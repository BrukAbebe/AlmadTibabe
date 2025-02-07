const { verifyToken,ApiError,catchAsync } = require('../utils');
const httpStatus = require('http-status');
const User = require('../models/User');

const protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;
  
  // Check if token exists and starts with "Bearer"
  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];
  }

  if (!token) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, 'Access denied. No token provided.')
    );
  }

  // Use verifyToken function to decode and verify JWT
  const decoded = verifyToken(token);
  
  // Attach user to the request object
  req.user = await User.findById(decoded.id);
  
  if (!req.user) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'User not found'));
  }
  
  next();  // Continue to the next middleware or route handler
});

module.exports = {
  protect,
};
