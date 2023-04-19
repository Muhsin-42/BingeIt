const router = require('express').Router();
const adminController = require('../controllers/adminController')
const dotenv = require('dotenv');
const { verify } = require('jsonwebtoken');
const JWT = require("jsonwebtoken");



// router.post('/register',adminController.UserSignup)
router.post('/login',adminController.adminLogin)
router.patch('/blockUser/:id',adminController.blockUser)
router.patch('/unblockUser/:id',adminController.unblockUser)
// router.post("/verifyToken", adminController.verifyToken);
// router.get("/:id/verify/:token",adminController.verifyEmail) //Email link verification


router.get('/getAllUsers',adminController.getAllUsers)
router.get('/getAllReviews',adminController.getAllReviews)
router.get('/getAllReports',adminController.getAllReports)
router.get('/searchUsers/:keyword',adminController.getSearchUsers)


module.exports = router;