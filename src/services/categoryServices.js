const { Category } = require('../models');

const postCategory = async ({ name }) => {
  const post = await Category.create({ name });
  return {
    id: post.id,
    name: post.name,
  };
};

const getCategory = async () => {
  const category = await Category.findAll();
  return category;
};

module.exports = { postCategory, getCategory };