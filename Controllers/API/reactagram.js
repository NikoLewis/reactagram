//Reactagram API router

const router = require('express').Router();
const Reactagram = require('../../Models/reactagram.js');

router.get('/posts', Reactagram.allPosts, (req, res) => {
  const allPosts = res.locals.data;
  res.json(allPosts);
});

router.get('/users/:id', Reactagram.user, (req, res) => {
  const userObj = res.locals.user;
  res.json(userObj);
});

router.get('/comments', Reactagram.allComments, (req, res) => {
  const commentObj = res.locals.comments;
  res.json(commentObj);
});

router.get('/users', Reactagram.allUsers, (req, res) => {
  const allUsers = res.locals.users;
  res.json(allUsers);
});

router.post('/comments', Reactagram.createComment, (req, res) => {
  const commentObj = res.locals.newcomment;
  res.json(commentObj);
});

router.post('/newpost', Reactagram.createPost, (req, res) => {
  const commentObj = res.locals.newpost;
  res.json(commentObj);
});

router.delete('/posts/:id', Reactagram.destroy, (req, res) => {
  const delPostObj = req.params.id;
  res.json(delPostObj);
});

module.exports = router;
