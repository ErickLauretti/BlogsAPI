const userServices = require('../services/userServices');

const makeLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await userServices.makeLogin(email, password);
  return res.status(200).json(login);
};

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const post = await userServices.postUser({ displayName, email, password, image });
  return res.status(201).json(post);
};

const getUser = async (req, res) => {
  const user = await userServices.getUser();
  return res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);
  if (!user) {
    return res.status(404).json({
      message: 'User does not exist',
    });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const user = await userServices.getUserByEmail(req.user.email);
  await userServices.userDelete({ id: user.id });
  return res.status(204).json({});
};

module.exports = {
  makeLogin,
  postUser,
  getUser,
  getUserById,
  deleteUser,
};