const router = require('express').Router();
const notificationController = require('../controllers/notificationController')
const dotenv = require('dotenv');
const { verify } = require('jsonwebtoken');
const JWT = require("jsonwebtoken");


//get
router.get('/notifications/:id',notificationController.getNotifications);


router.post('/follow/:id',notificationController.followNotiy)
router.patch('/make-seen/:id',notificationController.makeNotificationSeen)




module.exports = router;