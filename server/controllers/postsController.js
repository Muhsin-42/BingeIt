const {User} = require('../models/UserModel')
const bcrypt = require('bcrypt');
const  mongoose  = require('mongoose');
const PostsModel = require('../models/PostsModel');
const NotificationModel = require('../models/NotificationModel')
const ReportModal = require('../models/ReportModal');
const postsController = {


    createPost : async (req, res) => {
      try {
          const content  = req.body.content;
          const imageName  = req.body.data;
          const id  = Object(req.params.userId);
          const newPost = new PostsModel({
              content,
              author: id,
              image: imageName,
              likes:{}
          });
  
          const savedPost = await newPost.save();
          const populatedPost = await PostsModel.findById(savedPost._id)
              .populate('author', 'username profilePicture')
              .populate('comments.author', 'username profilePicture')
              .exec();
          
          res.status(201).json(populatedPost);
      } catch (error) {
          res.status(404).json({ message: error.message });
      }
    },
    deletePost : async (req,res) =>{
        try{
            const {postId} = req.params;
            const deletedPost = await PostsModel.findByIdAndUpdate(postId,{$set : {isDelete:true}},{new: true});
            
            res.status(200).json(deletedPost);
        }catch(error){
            res.status(500);
        }
    },

    getAllPosts : async(req,res)=>{
        try {
            const posts = await PostsModel.find()
            .populate('author', 'username name profilePicture')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'username name profilePicture' },
                options: { sort: { createdAt: -1 } }
            })
            .sort({ createdAt: -1 })
            .exec();
            
            res.status(200).json(posts)
        } catch (error) {
            res.status(500);
        }
    },

    like : async (req,res) =>{
        try{
            const postId = req.params.postId;
            const {userId} = req.body;
            const post = await PostsModel.findById(postId)
            const isLiked = post.likes.get(userId);
            if(isLiked){
                post.likes.delete(userId);
            }else{
                post.likes.set(userId,true);
                if(post.author != userId){
                    const notification = new NotificationModel({
                        type: 'postLiked',
                        postId : Object(post._id),
                        notificationFor: Object(post.author),
                        notificationBy: Object(userId),
                        notificationMessage: 'liked your post',
                    }); 
                    await notification.save();
                }
            }
            const updatedPost = await PostsModel.findByIdAndUpdate(postId, {likes: post.likes} , {new: true})
                                .populate('author', 'username name profilePicture')
                                .populate('comments.author', 'username name profilePicture')
                                .exec();


            res.status(200).json(updatedPost);
        }catch(error){
            res.status(500);
        }
    },

    addComment : async(req,res) =>{
        try{
            const { postId } = req.params;
            const { comment, currentUserId } = req.body;
            const post = await PostsModel.findById(postId);
            post.comments.unshift({ text: comment, author: currentUserId, isDelete: false });
            if(post.author != currentUserId){
                const notification = new NotificationModel({
                    type: "Comment",
                    notificationFor: post.author,
                    notificationBy: currentUserId,
                    postId: post._id, 
                    notificationMessage: 'commented on your post'
                })
                await notification.save();
            }
            const savedPost = await post.save();
            
            const populatedPost = await PostsModel.findById(savedPost._id)
                .populate('author', 'username name profilePicture')
                .populate({
                    path: 'comments',
                    populate: { path: 'author', select: 'username profilePicture' },
                    options: { sort: { createdAt: -1 } }
                })
                .exec();
    
            res.status(201).json(populatedPost);
        }catch(error){
            res.status(500);
        }
    },

    // report
    reportPost: async (req, res) => {
        try {
          const {postId} = req.params;
          const {reportReason, userId}  = req.body;
      
          // Check if there is already a report for this post by this user
          const existingReport = await ReportModal.findOne({
            post: postId,
            reportedBy: userId
          });
      
          if (existingReport) {
            return res.status(304).json({ msg: 'You have already reported this post' });
          }
      
          const newReport = new ReportModal({
            post: postId,
            reportedBy: userId,
            reportReason
          });
      
          const savedPost = await newReport.save();
      
          res.status(200).json({msg:'Reported the post'});
        } catch (error) {
          res.status(500).json({ message: 'Something went wrong' });
        }
    }
}


module.exports = postsController;