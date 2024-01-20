import React from "react";
import { Link } from "react-router-dom";
import timeago from "time-ago";

function ReplyCard({ currentUser, reply }) {
  return (
    <div className="reply-card text-white my-3">
      <div className="left">
        <img src={reply?.userId?.profilePicture} alt="" />
      </div>
      <div className="right">
        <div className="level1">
          <span className="fs-5 text-bold">
            {" "}
            <Link
              className="text-decoration-none text-white"
              to={`/profile/${reply?.userId._id}`}
            >
              {" "}
              {reply?.userId.name}{" "}
            </Link>
          </span>
          <span>{timeago.ago(reply?.createdAt)}</span>
        </div>
        <div className="level2">{reply?.replyMessage}</div>
      </div>
    </div>
  );
}

export default ReplyCard;
