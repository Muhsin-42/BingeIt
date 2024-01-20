import "./commentCard.scss";
import TimeAgo from "timeago.js";
import { Link } from "react-router-dom";

const CommentCard = ({ comment }) => {
  const timeAgo = new TimeAgo();
  return (
    <div className="reply-card text-white my-3">
      <div className="left">
        <img src={comment?.author?.profilePicture} alt="profile picture" />
      </div>
      <div className="right">
        <div className="level1">
          <span className="fs-5 text-bold">
            {" "}
            <Link
              className="text-decoration-none text-white"
              to={`/profile/${comment?.author?._id}`}
            >
              {" "}
              {comment?.author?.username}{" "}
            </Link>
          </span>
          <span>{timeAgo.format(comment?.createdAt)}</span>
        </div>
        <div className="level2">{comment?.text}</div>
      </div>
    </div>
  );
};

export default CommentCard;
