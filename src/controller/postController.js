const postService = require('../services/postServices');
const userService = require('../services/userServices');

const postNewBlogPost = async (req, res) => {
  const {
    title,
    content,
    categoryIds } = req.body;
  const user = await userService.getUserByEmail(req.user.email);
  const post = await postService.postNewPost({ title, content, categoryIds, userId: user.id });
  return res.status(201).json(post);
};

const getPost = async (_req, res) => {
  const post = await postService.getPost();
  return res.status(200).json(post);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  return res.status(200).json(post);
};

const putPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const put = await postService.putPost({ title, content, id });
  return res.status(200).json(put);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost({ id });
  return res.status(204).json({});
};

const allPost = async (req, res) => {
  const { q } = req.query;
  const result = await postService.allPost(q);
  return res.status(200).json(result);
};

module.exports = {
  postNewBlogPost,
  getPost,
  getPostById,
  putPost,
  deletePost,
  allPost,
};