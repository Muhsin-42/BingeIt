import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FlagIcon from "@mui/icons-material/Flag";
import "./postCard.scss";
import AddPost from "./AddPost";
import TimeAgo from "timeago.js";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket.io/socket.io";
import CommentCard from "./CommentCard";
import { setPost } from "../../Redux/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PostCard({ post, getAllPosts }) {
  const dispatch = useDispatch();
  const timeAgo = new TimeAgo();
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [liked, setLiked] = useState(
    // eslint-disable-next-line no-prototype-builtins
    post?.likes?.hasOwnProperty(currentUser._id)
  );
  const [likesCount, setLikesCount] = useState(
    post?.likes ? Object.keys(post?.likes).length : 0
  );
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const notifyReportSuccess = () => toast.success("The post is reported");
  const notifyReportExists = () => toast.warn("You have already reported!");
  const notifyReportFailure = () => toast.error("Something Went wrong");

  const handleLike = async () => {
    setLiked((prev) => !prev);
    const response = await axios.patch(
      `/api/post/like/${post._id}`,
      { userId: currentUser._id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (liked) {
      // setLiked(false)
      setLikesCount((prev) => prev - 1);
    } else {
      // setLiked(true);
      setLikesCount((prev) => prev + 1);
      const socketData = {
        fromSocket: true,
        senderId: currentUser._id,
        receiverId: response.data.author._id,
        type: "postLiked",
        reply: response.data.content,
        image: response.data.image,
        _id: response.data._id,
        postId: Object(response.data._id),
        notificationMessage: "liked your post",
        senderName: currentUser.name,
        senderUsername: currentUser.username,
        senderProfile: currentUser.profilePicture,
        createdAt: response.data.createdAt,
      };
      socket.emit("sendNotification", socketData);
    }
  };

  const handlePostComment = async () => {
    try {
      const response = await axios.patch(
        `/api/post/comment/${post._id}`,
        { comment, currentUserId: currentUser._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment("");
      dispatch(setPost({ post: response.data }));
    } catch (error) {
      console.log("handleComment err ", error);
    }
  };

  // Report

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReport = async (optionText) => {
    try {
      await axios
        .post(
          `/api/post/report/${post._id}`,
          { userId: currentUser._id, reportReason: optionText },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            notifyReportSuccess();
          }
        })
        .catch((error) => {
          if (error.response.status === 304) notifyReportExists();
          else notifyReportFailure();
        });
    } catch (error) {}
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`api/post/post/${post._id}`, {
            adminRequest: true,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          getAllPosts();
          //   dispatch(removeReview({reviewId: review._id}));

          if (response.status === 200) {
            Swal.fire("Deleted", "The Post is deleted", "success");
            // dispatch(setReviews({reviews: response.data}))
          } else {
            Swal.fire("Failed", "Failed to delete the post", "error");
          }
        } catch (error) {
          console.log("blockUser error => ", error);
        }
      }
    });
  };

  return (
    <div className="postCard">
      <ToastContainer autoClose={1300} />
      <div className="level1">
        <div className="set1 d-flex">
          <img src={post?.author?.profilePicture} alt="" />
          <div
            className="nameUsername mx-2 d-flex "
            style={{ flexDirection: "column" }}
          >
            <span className="fs-4">{post?.author?.name}</span>
            <span className="d-block">@{post?.author?.username}</span>
          </div>
        </div>
        <div className="set2">{timeAgo.format(post?.createdAt)}</div>
      </div>

      <div className="level2">
        <p>{post?.content}</p>
      </div>

      {post?.image !== "" && (
        <div className="level3">
          <img src={post?.image} alt="" />
        </div>
      )}

      <div className="level4 mt-2">
        {liked ? (
          <FavoriteIcon
            color="error"
            onClick={handleLike}
            className="cursor-pointer"
          />
        ) : (
          <FavoriteBorderIcon onClick={handleLike} className="cursor-pointer" />
        )}
        <span className="mx-2">{likesCount} likes</span>
        <InsertCommentIcon
          onClick={() => setShowComments(!showComments)}
          className="cursor-pointer mx-2 "
        />

        {currentUser._id !== post?.author?._id ? (
          <>
            <FlagIcon onClick={handleOpen} className="cursor-pointer" />

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Report the post
                </Typography>
                <ListItemButton
                  onClick={() => handleReport("Irrelevant Topic")}
                  component="a"
                  href="#simple-list"
                >
                  <ListItemText primary="Irrelevant Topic" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleReport("Scam or fraud")}
                  component="a"
                  href="#simple-list"
                >
                  <ListItemText primary="Scam or fraud" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleReport("Hate speech or symbol")}
                  component="a"
                  href="#simple-list"
                >
                  <ListItemText primary="Hate speech or symbol" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleReport("False Information")}
                  component="a"
                  href="#simple-list"
                >
                  <ListItemText primary="False Information" />
                </ListItemButton>
              </Box>
            </Modal>
          </>
        ) : (
          <>
            <DeleteIcon
              onClick={deletePost}
              className="cursor-pointer"
            ></DeleteIcon>
          </>
        )}
      </div>

      {showComments && (
        <div className="level5">
          <div className="set1">
            <img src={currentUser.profilePicture} alt="" />
          </div>
          <div className="set2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment((prev) => e.target.value)}
              className="input-group"
              placeholder="Write a comment"
            />
          </div>
          <div className="set3">
            <button onClick={handlePostComment} className="btn btn-success">
              POST
            </button>
          </div>
        </div>
      )}
      {showComments &&
        post?.comments?.map((comment) => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}

      <AddPost />
    </div>
  );
}

export default PostCard;
