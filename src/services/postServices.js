const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const postNewPost = async ({ title, content, userId, categoryIds }) => {
  const post = await BlogPost.create({ title, content, userId });
  categoryIds.map(async (id) => {
    await PostCategory.create({ postId: post.id, categoryId: id });
  });
  return post;
};

const getPost = async () => {
  const post = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
   ],
    attributes: { exclude: ['user_id'] },
  });
  return post;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
   ],
   attributes: { exclude: ['user_id'] },
  });
  return post;
};

const putPost = async ({ title, content, id }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const post = await getPostById(id);
  return post;
};

const deletePost = async ({ id }) => {
  const postDeleted = await BlogPost.destroy({ where: { id } });
  return postDeleted;
};

const allPost = async (q) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [{
        title: { [Op.like]: `%${q}%` },
      },
      {
        content: { [Op.like]: `${q}` },
      }],
    },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = {
  postNewPost,
  getPost,
  getPostById,
  putPost,
  deletePost,
  allPost,
};