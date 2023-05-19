const router = require('express').Router();
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');



//  User
router.put('/:id',authController.verifyToken,usersController.updateUserPut);
router.get('/user/:id',authController.verifyToken,usersController.getUser);
router.get('/search-users',authController.verifyToken,usersController.searchUsers);


//review
router.get('/review/:movieId',authController.verifyToken,usersController.getReviews);
router.post('/review/:userId/:movieId',authController.verifyToken,usersController.postReview);
router.delete('/review/:reviewId',authController.verifyToken,usersController.deleteReview);

//replies
router.post('/reply/:reviewId/:userId',authController.verifyToken,usersController.postReply);
router.get('/reply/:reviewId',authController.verifyToken,usersController.getReply);


// follow
router.get('/followers/:uid',authController.verifyToken,usersController.getUserFollowers);
router.get('/following/:uid',authController.verifyToken,usersController.getUserFollowings);
router.patch('/follow/:id',authController.verifyToken,usersController.followUser);
router.patch('/unfollow/:id',authController.verifyToken,usersController.unfollowUser);

// profile
router.patch('/profile-pic/:id',authController.verifyToken,usersController.updateProfilePic);
router.put('/profile/:id',authController.verifyToken,usersController.updateUserPut);

// favourite
router.put('/favourite/:movieId',authController.verifyToken,usersController.addFavourite);
router.delete('/favourite/:movieId/:userId',authController.verifyToken,usersController.removeFavourite);

// watched
router.put('/watched/:movieId',authController.verifyToken,usersController.addWatched);
router.delete('/watched/:movieId/:userId',authController.verifyToken,usersController.removeWatched);

// wishlist
router.put('/wishlist/:movieId',authController.verifyToken,usersController.addWishlist);
router.delete('/wishlist/:movieId/:userId',authController.verifyToken,usersController.removeWishlist);



module.exports =  router;