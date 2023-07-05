const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const tokenValidate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = { tokenValidate };