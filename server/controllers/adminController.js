var Loginvalidate = require('../utils/validate')
const { Admin, validate } = require("../models/AdminModel");
const { User } = require("../models/UserModel");
const ReviewsModel = require("../models/ReviewModel");
const ReportModel = require("../models/ReportModal");
const TokenModel = require("../models/TokenModel");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ReportModal = require('../models/ReportModal');


const adminController = {
    AdminSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      console.log(error)
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
          .send({ message: "User with given email already Exist!", emailExists: true });
      if (userPhone)
        return res
          .status(409)
          .send({ message: "User with given Phone already Exist!", phoneExists: true });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      user = await new User({ ...req.body, password: hashPassword }).save();

      //send email
      const token = await new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex')
      }).save();
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      await sendEmail(user.email,"Verify Email",url);

      res.status(201).send({ message: "Email Sent to your account, please verify" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
    },
    verifyEmail: async(req,res)=>{
      try{
        console.log('5444444')
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.status(400).send({message: "Invalid link"})

        const token = await TokenModel.findOne({
          userId: user._id,
          token: req.params.token
        })


        if(!token) return res.status(400).send({message: "Invalid link"});

        await User.updateOne({_id: user._id},{ verified: true});
        await TokenModel.deleteOne({_id: token._id})

        res.status(200).send({message: "Email Verified Successfully" })
      }catch(error){
        res.status(500).send({message: "Internal Server Error" })
      }

    },



    adminLogin:  async (req, res) => {
      console.log('ehjeejej')
      try {
        var { error } = Loginvalidate(req.body);
        console.log('error 202',error)
        if (error)
          return res.status(400).send({ message: error.details[0].message });
        
        console.log('error 206 ',req.body.email)

        var admin = await Admin.findOne({ email: req.body.email });
        console.log(admin)
        if (!admin)
          return res.status(401).send({ message: "Invalid Email or Password" });

        var validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validPassword)
          return res.status(401).send({ message: "Invalid Email or Password" });


        var token = admin.generateAuthToken();

        res.status(200).json({ token, user: admin });
      } catch (error) {
        console.log('102 =>' ,error)
        res.status(500).send({ message: "Internal Server Error",error });
      }


    },
    verifyToken: async (req, res,next) => {
      try {
        const authHeader = req.headers.authorization;
        const Token = authHeader ? authHeader.split(' ')[1].trim() : null;
        console.log(`trrrrrrr${Token}`);
        const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        console.log('eeeeooofcc')
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        next();
        // return res.status(200).json({ message: "token valid", user });
      } catch (error) {
        console.log('errrrrrrr ',error);
        res.json({ status: "error", error: "invalid token" });
      }
    },




    // /////////////////////////////////
    getAllUsers : async(req,res)=>{
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (error) {
          console.log('get all users error => ',error)
          res.status(500)
        }
    },
    getSearchUsers : async(req,res)=>{
      console.log('getSearchUsers')
        try {
          const regex = new RegExp(req.params.keyword, 'i');
          const users = await User.find({
            $or: [
              { username: regex },
              { name: regex },
              { email: regex },
            ],
          });
            console.log(users)
            res.status(200).json(users)
        } catch (error) {
          console.log('get all users error => ',error)
          res.status(500)
        }
    },
    getAllReviews : async(req,res)=>{
      console.log('getttReviews')
      try {
          const reviews = await ReviewsModel.find()
          .populate('userId', 'username name profilePicture')
          .sort({ createdAt: -1 })
          .exec();
          
          res.status(200).json(reviews);
      } catch (error) {
          console.log('GetAllPosts error ',error) 
          res.status(500);
      }
    },
    getAllReports: async (req, res) => {
      try {
        const reports = await ReportModal.aggregate([
          {
            $group: {
              _id: "$post",
              count: { $sum: 1 },
              reasons: { $push: "$reportReason" },
              reportedBy: { $push: "$reportedBy" }
            }
          },
          {
            $lookup: {
              from: "posts",
              localField: "_id",
              foreignField: "_id",
              as: "post"
            }
          },
          {
            $unwind: "$post"
          },
          {
            $lookup: {
              from: "users",
              localField: "reportedBy",
              foreignField: "_id",
              as: "reportedByUsers"
            }
          },
          {
            $project: {
              _id: 1,
              count: 1,
              reasons: 1,
              reportedBy: {
                $map: {
                  input: "$reportedByUsers",
                  as: "user",
                  in: {
                    _id: "$$user._id",
                    username: "$$user.username",
                    name: "$$user.name",
                    profilePicture: "$$user.profilePicture"
                  }
                }
              },
              content: "$post.content",
              author: "$post.author",
              image: "$post.image",
              createdAt: "$post.createdAt",
              isDelete: "$post.isDelete",
              status: 1
            }
          }
        ]);
    
        console.log("reports", reports);
        res.status(200).json(reports);
      } catch (err) {
        console.log('getAllreport error => ', err)
      }
    },
    


    blockUser : async(req,res) =>{
      console.log('blockUser');
      try {
        const userId = Object(req.params.id);
        const result = await User.findByIdAndUpdate( userId,{$set:{isActive:false}},{new:true});
        res.status(200).json({msg:'user Blocked'});
      } catch (error) {
        console.log('blockUser Error => ',error);
        res.status(500).json({msg:'error blocking user'+error});
      }
    },
    unblockUser : async(req,res) =>{
      console.log('unblockUser');
      try {
        const userId = Object(req.params.id);
        const result = await User.findByIdAndUpdate( userId,{$set:{isActive:true}},{new:true});
        res.status(200).json({msg:'user unBlocked'});
      } catch (error) {
        console.log('unblockUser Error => ',error);
        res.status(500).json({msg:'error unblocking user'+error});
      }
    }

}


module.exports = adminController;