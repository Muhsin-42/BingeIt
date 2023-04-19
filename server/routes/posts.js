const router = require('express').Router();
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');
const usersController = require('../controllers/usersController');


// Post
router.post('/post/:userId',authController.verifyToken,postsController.createPost);
router.delete('/post/:postId',authController.verifyToken,postsController.deletePost);
router.post('/report/:postId',authController.verifyToken,postsController.reportPost);
router.get('/posts',authController.verifyToken,postsController.getAllPosts);
router.patch('/like/:postId',authController.verifyToken,postsController.like)
router.patch('/comment/:postId',authController.verifyToken,postsController.addComment)


module.exports =  router;