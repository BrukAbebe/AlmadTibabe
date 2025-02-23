const { StatusCodes } = require("http-status-codes");
const authService = require("../services/authService");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login({ username, password });
  res.status(StatusCodes.OK).json(result);
});

module.exports = {
  login,
};