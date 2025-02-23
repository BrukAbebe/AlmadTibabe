// middlewares/protect.js
const { verifyToken } = require('../utils/verifyJwtToken');  // Correct path for import
const { StatusCodes } = require("http-status-codes");
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];  
  }

  if (!token) {
    return next(
      new ApiError(StatusCodes.UNAUTHORIZED, 'Access denied. Please log in to continue.')
    );
  }

  let decoded;
  try {
    decoded = verifyToken(token); 
  } catch (error) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token.'));
  }

  const authenticatedUser = await User.findOne({ _id: decoded.id, role: decoded.role });
  
  if (!authenticatedUser) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication failed. Please try logging in again.'));
  }
  
  if (authenticatedUser.role !== 'admin') {
    return next(new ApiError(StatusCodes.FORBIDDEN, 'You do not have the necessary permissions to access this resource.'));
  }
  
  req.user = authenticatedUser;
  req.userRole = decoded.role;
  
  next();
});

module.exports = { protect };
