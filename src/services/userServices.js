const { generateToken } = require('../token/token');
const { User } = require('../models');

const makeLogin = async (email, password) => {
  const token = generateToken(email, password);
  return { token };
};

const postUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });
  const token = generateToken(email, password);
  return { token };
};

const getUser = async () => {
  const user = User.findAll({
    attributes: { exclude: ['password'] },
  });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const userDelete = async ({ id }) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
  makeLogin,
  postUser,
  getUser,
  getUserById,
  getUserByEmail,
  userDelete,
};