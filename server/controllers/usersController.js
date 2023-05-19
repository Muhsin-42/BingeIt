const {User} = require('../models/UserModel')
const bcrypt = require('bcrypt');
const  mongoose  = require('mongoose');
const ReviewModel =  require('../models/ReviewModel')
const ReplyModel = require('../models/RepliesModel')

const usersController = {
    updateUserPut : async(req,res)=>{
        try {
            if(req.body.userId === req.params.id){
                //to change password
                if(req.body.password){
                    try{
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.password,salt)
                    }catch(error){
                        return res.status(500).json(error);    
                    }
                }
    
                //to update details
                try{
                    await User.findByIdAndUpdate(Object(req.params.id),{
                        $set:req.body
                    }, { new: true }).then((updatedUser)=>{
                        res.status(200).json({updatedUser,msg:'Account has been updated'});
                    }).catch((error) => {
                        throw error;
                    });
                }catch(error){
                    res.status(500).json(error)
                  }
                }
              } catch (error) {
                res.status(500).json(error)
              }
    } ,
    addWishlist : async(req,res)=>{
        try {
            const movieId = req.params.movieId;
            const userId = req.body.userId;


            const updatedUserT = await User.findByIdAndUpdate(Object(userId),{$addToSet: {wishlist: movieId }},{new: true});
            const updatedUser = await User.findByIdAndUpdate(Object(userId),{$pull: {watched: movieId }},{new: true});

            res.status(200).json({updatedUser:updatedUser,msg: 'Movie added to wishlist'});
          } catch (error) {
          res.status(500);
        }
    },
    addFavourite : async(req,res)=>{
        try {
            const movieId = req.params.movieId;
            const userId = req.body.userId;

            const updatedUser = await User.findByIdAndUpdate(Object(userId),{$addToSet: {favourite: movieId }},{new: true});
            res.status(200).json({updatedUser:updatedUser,msg: 'Movie added to wishlist'});
        } catch (error) {
          res.status(500)
        }
    },
    addWatched : async(req,res)=>{
        try {
            const movieId = req.params.movieId;
            const userId = req.body.userId;
            
            const updatedUserT = await User.findByIdAndUpdate(Object(userId),{$addToSet: {watched: movieId }},{new: true});
            const updatedUser = await User.findByIdAndUpdate(Object(userId),{$pull: {wishlist: movieId }},{new: true});
            res.status(200).json({updatedUser:updatedUser,msg: 'Movie added to wishlist'});
        } catch (error) {
          res.status(500)
        }
    },



    //removes
    removeWishlist: async (req, res) => {
        try {
          const movieId = req.params.movieId;
          const userId = req.params.userId;
      
          const updatedUser = await User.findByIdAndUpdate(
            Object(userId),
            { $pull: { wishlist: movieId } },
            { new: true }
          );

          res.status(200).json({
            updatedUser: updatedUser,
            msg: 'Movie removed from wishlist',
          });
        } catch (error) {
          res.status(500)
        }
      },
      removeFavourite: async (req, res) => {
        try {
            const movieId = req.params.movieId;
            const userId = req.params.userId;
      
          const updatedUser = await User.findByIdAndUpdate(
            Object(userId),
            { $pull: { favourite: movieId } },
            { new: true }
          );
      
          res.status(200).json({
            updatedUser: updatedUser,
            msg: 'Movie removed from wishlist',
          });
        } catch (error) {
          res.status(500)
        }
      },
      removeWatched: async (req, res) => {
        try {
          const movieId = req.params.movieId;
          const userId = req.params.userId;

          const updatedUser = await User.findByIdAndUpdate(
            Object(userId),
            { $pull: { watched: movieId } },
            { new: true }
          );
      
          res.status(200).json({
            updatedUser: updatedUser,
            msg: 'Movie removed from wishlist',
          });
        } catch (error) {
          res.status(500)
        }
      },
                  



    getUser : async (req,res)=>{
        try {
            const userId = req.params.id;
            const user = await User.findOne({ _id: Object(userId) })

            if(user) res.status(200).json(user);
            else res.status(404).json({message: 'user not found'});
        } catch (error) {
            res.status(500).json(error)
        }
    },

    searchUsers : async (req,res)=>{
        try{
            const searchQuery = req.query.query;
            const regex = new RegExp(searchQuery, 'i');
            const users = await User.find({ $or: [ { name: regex }, { username: regex } ] });

            res.status(200).json(users);
        }catch(error){
            res.status(500).json(error);
        }
    },
    
    getUserFollowers : async (req,res)=>{
      try {
        const userId = Object(req.params.uid);
    
        const user = await User.findById(userId);
    
        const followersId = user.followers.map(f => Object(f));

        const followers = await User.find({ _id: { $in: followersId } });
    
        res.json(followers);
      } catch (err) {
        res.status(500).json({msg: 'internal error'});
      }
    },
    getUserFollowings : async (req,res)=>{
      try {
        const userId = Object(req.params.uid);
    
        const user = await User.findById(userId);
    
        const followingIds = user.following.map(f => Object(f));

        const followingUsers = await User.find({ _id: { $in: followingIds } });
    
        res.json(followingUsers);
      } catch (err) {
        res.status(500).json({msg: 'internal error'});
      }
    },

    

    // Follow
    followUser : async(req,res)=>{
        try {
            const { currentUser } = req.body;
            const user = await User.findById(req.params.id);
            const follower = await User.findById(currentUser);
        
            if (!user || !follower) {
              return res.status(404).send({ message: 'User not found' });
            }

            // Add the follower's ID to the user's followers array
            if(!user.followers.includes(follower._id))
            await user.updateOne({ $push: { followers: follower._id } });
            
            // Add the user's ID to the follower's following array
            if(!follower.following.includes(user._id))
            await follower.updateOne({ $push: { following: user._id } });

            const cUser = await User.findById(currentUser);

            res.status(200).json(cUser);
        } catch (error) {
            res.status(500).send({message:error})
        }
    },
    // Unfollow an user
    unfollowUser: async (req, res) => {
        try {
        const { currentUser } = req.body;
        const user = await User.findById(req.params.id);
        const follower = await User.findById(currentUser);
    
        if (!user || !follower) {
            return res.status(404).send({ message: 'User not found' });
        }
  
      // Remove the follower's ID from the user's followers array
      await user.updateOne({ $pull: { followers: follower._id } });
  
      // Remove the user's ID from the follower's following array
      await follower.updateOne({ $pull: { following: user._id } });
  
      const cUser = await User.findById(currentUser);
  
      res.status(200).json(cUser);
    } catch (error) {
      res.status(500).send({ message: error })
    }
    },

    editProfile : async (req,res)=>{
        const currentUserId = req.params.id;
        try {
            const updatedUser = await User.findOneAndUpdate({_id: currentUserId}, {$set: req.body}, {new: true});

            if (updatedUser) {
                res.status(200).json(updatedUser);
              } else {
                res.status(404).json({message: 'User not found'});
              }
        } catch (error) {
            res.status(500).send({error});
        }
    },

    updateProfilePic : async (req,res)=>{
        const currentUserId = req.params.id;
        try {
            // res.status(200).json();
            const updatedUser = await User.findOneAndUpdate({_id: currentUserId}, {$set: {profilePicture: req.body.data}}, {new: true});

            if (updatedUser) {
                res.status(200).json(updatedUser);
              } else {
                res.status(404).json({message: 'User not found'});
              }
        } catch (error) {
            res.status(500).send({error});
        }
    },





    // Review
    postReview: async( req,res)=>{
      try {
        const rating = req.body.rating;
        const reviewMessage = req.body.reviewMessage;
        const userId = Object(req.params.userId);
        const movieId = req.params.movieId;

        const reviewCheck = await ReviewModel.find({ movieId: movieId , userId: userId });
        if(reviewCheck.length){
          return res.status(400).json({reviewExists:true})
        }

        // Create a new review document using the Review model
        const newReview = await new ReviewModel({
          movieId: movieId,
          userId : userId,
          rating: rating,
          reviewMessage: reviewMessage
        }).save();

        const allReviews = await ReviewModel.find({ movieId: movieId }).populate('userId').sort({ createdAt: -1 });


        res.status(200).json(allReviews);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    getReviews : async(req,res)=>{
      try {
        const movieId = req.params.movieId;
        const reviews = await ReviewModel.find({ movieId: movieId }).populate('userId').sort({ createdAt: -1 });
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500);
      }
    },
    getAllReviews : async(req,res)=>{
      try {
        const reviews = await ReviewModel.find().populate('userId', 'username name profilePicture email').sort({ createdAt: -1 });
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500);
      }
    },
    deleteReview : async(req,res)=>{
      try {
        const {adminRequest} = req.body;
        const reviewId = Object(req.params.reviewId);
        const result = await ReviewModel.findByIdAndDelete(reviewId);

        const newSetOfReviews = await ReviewModel.find({movieId: result.movieId});
        res.status(200).json(newSetOfReviews);
      } catch (error) {
        res.status(500).json(false);
      }
    },


    // Reply
    postReply :async( req,res)=>{
      try {
        const reviewId = Object(req.params.reviewId);
        const replyMessage = req.body.data;
        const userId = Object(req.params.userId);

        // Create a new review document using the Review model
        const newReply = await new ReplyModel({
          reviewId : reviewId,
          userId : userId,
          replyMessage: replyMessage
        }).save();

        const allReplies = await ReplyModel.find({ reviewId: reviewId })
              .populate('userId','username name email profilePicture')
              .sort({ createdAt: -1 });

        res.status(200).json(allReplies);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    
    getReply :async( req,res)=>{
      try {
        const reviewId = Object(req.params.reviewId);

        // Create a new review document using the Review model
        const allReplies = await ReplyModel.find({ reviewId: reviewId })
              .populate('userId','username name email profilePicture')
              .sort({ createdAt: -1 });


        res.status(200).json(allReplies);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
}


module.exports = usersController;