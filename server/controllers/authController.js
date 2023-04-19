

var Loginvalidate = require('../utils/validate')
const { User, validate } = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authController = {
    UserSignup: async (req, res) => {
      console.log('userSignup')
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
      }).save();      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      console.log('Spenvvvv ',process.env.BASE_URL);
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



    userLogin:  async (req, res) => {
      try {
        var { error } = Loginvalidate(req.body);
        console.log('error 202',error)
        if (error)
          return res.status(400).send({ message: error.details[0].message });
        
        console.log('error 206')

        var user = await User.findOne({ email: req.body.email });
        if (!user)
          return res.status(401).send({ message: "Invalid Email or Password" });

        var validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
          return res.status(401).send({ message: "Invalid Email or Password" });

        if(!user.verified){
          let token = await TokenModel.findOne({userId:user._id});
          if(!token){
            token = await new TokenModel({
              userId: user._id,
              token: crypto.randomBytes(32).toString('hex')
            }).save();
            console.log('penvvvv ',process.env.BASE_URL);
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
            await sendEmail(user.email,"Verify Email",url);
          }
          return res.status(400).send({message:'An email sent to your account please verify!'})
        }

        if(!user.isActive){
          return res.status(401).send({message: "You have been Blocked"})
        }


        var token = user.generateAuthToken();

        res.status(200).json({ token, user });
      } catch (error) {
        console.log('102 =>' ,error)
        res.status(500).send({ message: "Internal Server Error",error });
      }


    },
    verifyToken: async (req, res,next) => {
      try {
        const authHeader = req.headers.authorization;
        const Token = authHeader ? authHeader.split(' ')[1].trim() : null;
        const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        next();
        // return res.status(200).json({ message: "token valid", user });
      } catch (error) {
        console.log('errrrrrrr ',error);
        res.json({ status: "error", error: "invalid token" });
      }
    },


    verifyUserBlocked : async (req,res) =>{
      try{
        const {userId} = req.body;
        const result = await User.findById(userId);
        console.log('result ', result);
        res.status(200)
      }catch(error){
        res.status(500)

      }
    }
}


module.exports = authController;


















































// const bcrypt = require('bcrypt')
// const JWT = require('jsonwebtoken')
// const dotenv =  require('dotenv')



// let refreshTokens = [];

// const authController = {
//     registerPost : async(req,res)=>{
//         try {
//             // Hashing Password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
//             // Creating new Password
//             const newUser = await new UserModel({
//                 username: req.body.username,
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hashedPassword
//             })
    
//             // Save user 
//             const user = await newUser.save(); 


//             // jwt
//             // const accessToken = await JWT.sign(
//             //     { email },
//             //     process.env.ACCESS_TOKEN_SECRET,
//             //     {
//             //       expiresIn: "1m",
//             //     }
//             //   );
          
//             //   res.json({
//             //     accessToken,
//             //     user
//             //   });


//             res.status(200).json(user);
//         } catch (error) {
//             console.log(error);
//             res.status(500).json(error)
//         }
//     },

//     loginPost : async(req,res)=>{
//         try {
//             const user = await UserModel.findOne({email: req.body.email});
//             !user && res.status(404).send('user not found');
            
//             // checks the password
//             const validPassword = await bcrypt.compare(req.body.password,user.password)
//             !validPassword && res.status(400).json('Incorrect Password')

//             // If user there and Password is correct

//             // const accessToken = JWT.sign({
//             //     id:user._id, 
//             //     isAdmin: user.isAdmin},
//             //     process.env.JWT_SECRET_KEY,
//             //     {expiresIn: "15m"})

//             // const refreshToken = JWT.sign({
//             //     id:user._id, 
//             //     isAdmin: user.isAdmin},
//             //     process.env.JWT_SECRET_KEY,
//             //     {expiresIn: "15m"})

//                  // Set refersh token in refreshTokens array
//             // refreshTokens.push(refreshToken);

//             // res.status(200).json({
//             //     username: user.username,
//             //     isAdmin: user.isAdmin,
//             //     accessToken,
//             //     refreshToken
//             // });
//             res.status(200).json(user);
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     },

//     refreshTokenPost: async (req, res) => {
//         const refreshToken = req.header("x-auth-token");
      
//         // If token is not provided, send error message
//         if (!refreshToken) {
//           res.status(401).json({
//             errors: [
//               {
//                 msg: "Token not found",
//               },
//             ],
//           });
//         }
      
//         // If token does not exist, send error message
//         if (!refreshTokens.includes(refreshToken)) {
//           res.status(403).json({
//             errors: [
//               {
//                 msg: "Invalid refresh token",
//               },
//             ],
//           });
//         }
      
//         try {
//           const user = await JWT.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//           );
//           // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
//           const { email } = user;
//           const accessToken = await JWT.sign(
//             { email },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: "1m" }
//           );
//           res.json({ accessToken });
//         } catch (error) {
//           res.status(403).json({
//             errors: [
//               {
//                 msg: "Invalid token",
//               },
//             ],
//           });
//         }
//     },

//     logout: (req, res) => {
//         const refreshToken = req.header("x-auth-token");
      
//         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//         res.sendStatus(204);
//     }
// }






// module.exports = authController;

