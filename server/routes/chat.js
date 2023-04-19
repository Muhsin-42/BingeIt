const router = require('express').Router();
const authController = require('../controllers/authController');
const chatsController = require('../controllers/chatController');

// Post
router.post('/group',authController.verifyToken,chatsController.createGroup);
router.get('/group',authController.verifyToken,chatsController.getGroups);
router.post('/:groupId/messages', authController.verifyToken,chatsController.addMessage);
  

module.exports =  router;