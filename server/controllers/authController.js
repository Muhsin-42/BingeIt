var Loginvalidate = require("../utils/validate.js");
const { User, validate } = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  UserSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(401).send({ message: error.details[0].message });

      let username = await User.findOne({ username: req.body.username });
      let user = await User.findOne({ email: req.body.email });
      let userPhone = await User.findOne({ phone: req.body.phone });
      if (username)
        return res
          .status(409)
          .send({ message: "Username is taken!", usernameExists: true });
      if (user)
        return res
          .status(409)
          .send({
            message: "User with given email already Exist!",
            emailExists: true,
          });
      if (userPhone)
        return res
          .status(409)
          .send({
            message: "User with given Phone already Exist!",
            phoneExists: true,
          });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      user = await new User({ ...req.body, password: hashPassword }).save();

      //send email
      const token = await new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;

      await sendEmail(user.email, "Verify Email", url);

      res
        .status(201)
        .send({ message: "Email Sent to your account, please verify" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send({ message: "Invalid link" });

      const token = await TokenModel.findOne({
        userId: user._id,
        token: req.params.token,
      });

      if (!token) return res.status(400).send({ message: "Invalid link" });

      await User.updateOne({ _id: user._id }, { verified: true });
      await TokenModel.deleteOne({ _id: token._id });

      res.status(200).send({ message: "Email Verified Successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  userLogin: async (req, res) => {
    console.log("login ");
    try {
      var { error } = Loginvalidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      var user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      var validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (!user.verified) {
        let token = await TokenModel.findOne({ userId: user._id });
        if (!token) {
          token = await new TokenModel({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
        }
        return res
          .status(400)
          .send({ message: "An email sent to your account please verify!" });
      }

      if (!user.isActive) {
        return res.status(401).send({ message: "You have been Blocked" });
      }

      var token = user.generateAuthToken();

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  },
  verifyToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const Token = authHeader ? authHeader.split(" ")[1].trim() : null;
      const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
      const email = decoded.email;
      const user = await User.findOne({ email: email });
      next();
    } catch (error) {
      console.log("err ", error);
      res.status(400).json({ status: "error", error: "invalid token" });
    }
  },

  verifyUserBlocked: async (req, res) => {
    try {
      const { userId } = req.body;
      const result = await User.findById(userId);
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  },
};

module.exports = authController;
