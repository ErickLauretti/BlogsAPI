const express = require('express');
const PostController = require('./controller/postController');
const CategoryController = require('./controller/categoryController');
const UserController = require('./controller/userController');
const { tokenValidate } = require('./middlewares/tokenMiddlewares');
const { categoryValidate } = require('./middlewares/categoryMiddlewares');
const {
  postExist,
  categoryValidateCheck,
  postExistValidate,
  userValidateFields,
  putPostValidate,
} = require('./middlewares/postMiddlewares');
const {
  loginAndPasswordValidate,
  userValidate,
  displayNameValidate,
  emailValidate,
  passwordValidate,
  emailRegisterValidate,
} = require('./middlewares/usermiddlewares');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.get('/user', tokenValidate, UserController.getUser);
app.get('/user/:id', tokenValidate, UserController.getUserById);
app.get('/categories', tokenValidate, CategoryController.getCategory);
app.get('/post', tokenValidate, PostController.getPost);
app.get('/post/search', tokenValidate, PostController.allPost);
app.get('/post/:id', tokenValidate, postExistValidate, PostController.getPostById);

app.post(
  '/login',
  loginAndPasswordValidate,
  userValidate,
  UserController.makeLogin,
);
app.post(
  '/user',
  displayNameValidate,
  emailValidate,
  passwordValidate,
  emailRegisterValidate,
  UserController.postUser,
);
app.post('/categories', tokenValidate, categoryValidate, CategoryController.postCategory);
app.post(
  '/post',
  tokenValidate,
  postExist,
  categoryValidateCheck,
  PostController.postNewBlogPost,
);

app.put(
  '/post/:id',
  tokenValidate,
  putPostValidate,
  userValidateFields,
  PostController.putPost,
);

app.delete(
  '/post/:id',
  tokenValidate,
  postExistValidate,
  userValidateFields,
  PostController.deletePost,
);
app.delete('/user/me', tokenValidate, UserController.deleteUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
