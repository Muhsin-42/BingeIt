const router = require('express').Router();
const authController = require('../controllers/authController')
const dotenv = require('dotenv');
const { verify } = require('jsonwebtoken');
const JWT = require("jsonwebtoken");



router.post('/register',authController.UserSignup)
router.post('/login',authController.userLogin)
router.post("/verifyToken", authController.verifyToken);
router.post("/verifyUserBlocked", authController.verifyUserBlocked);
router.get("/:id/verify/:token",authController.verifyEmail) //Email link verification




module.exports = router;