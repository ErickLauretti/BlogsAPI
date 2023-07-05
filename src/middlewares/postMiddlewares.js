const { Category, BlogPost } = require('../models');
const userServices = require('../services/userServices');
const postServices = require('../services/postServices');

const postExist = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({
        message: 'Some required fields are missing',
    });
  }
  next();
};

const categoryValidateCheck = async (req, res, next) => {
  const { categoryIds } = req.body;
  const category = await Category.findAll({ where: { id: categoryIds } });
  if (category.length !== categoryIds.length) {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
  }
  next();
};

const postExistValidate = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findByPk(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post does not exist',
    });
  }
  next();
};

const userValidateFields = async (req, res, next) => {
  const { id } = req.params;
  const { id: userLoggedId } = await userServices.getUserByEmail(req.user.email);
  const { userId } = await postServices.getPostById(id);
  if (userLoggedId !== userId) {
    return res.status(401).json({
      message: 'Unauthorized user',
    });
  }
  next();
};

const putPostValidate = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

module.exports = {
  postExist,
  categoryValidateCheck,
  postExistValidate,
  userValidateFields,
  putPostValidate,
};