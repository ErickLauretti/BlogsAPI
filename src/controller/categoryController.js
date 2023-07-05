const categoryServices = require('../services/categoryServices');

const postCategory = async (req, res) => {
  const { name } = req.body;
  const post = await categoryServices.postCategory({ name });
  return res.status(201).json(post);
};

const getCategory = async (req, res) => {
  const category = await categoryServices.getCategory();
  return res.status(200).json(category);
};

module.exports = {
  postCategory,
  getCategory,
};