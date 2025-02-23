const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const { signToken } = require("../utils"); 

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid username or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid username or password");
  }

  const token = signToken({ id: user._id, role: user.role });
  return {
    status: "success",
    message: "You have successfully logged in.",
    data: {
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      token,
    },
  };
};

module.exports = {
  login,
};