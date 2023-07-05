const { User } = require('../models');

const checkEmail = (email) => {
  const check = /\S+@\S+\.\S+/;
  return check.test(email);
};

const loginAndPasswordValidate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const userValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }
  next();
};

const displayNameValidate = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const emailValidate = async (req, res, next) => {
  const { email } = req.body;
  const emailValid = checkEmail(email);
  if (!emailValid) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  next();
};

const passwordValidate = async (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};

const emailRegisterValidate = async (req, res, next) => {
 const { email } = req.body;
 const result = await User.findOne({ where: { email } });
 if (result) {
    return res.status(409).json({
      message: 'User already registered',
    });
 }
 next();
};

module.exports = {
  loginAndPasswordValidate,
  userValidate,
  displayNameValidate,
  emailValidate,
  passwordValidate,
  emailRegisterValidate,
};