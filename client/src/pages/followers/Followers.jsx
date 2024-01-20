import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import UserRow from "../../component/userRow/UserRow";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Followers({ profileUser, activeTab }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const getFollowers = async () => {
    if (Object.keys(profileUser).length) {
      const result = await axios.get(`api/user/followers/${profileUser._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowers(result.data);
    }
  };

  const getFollowing = async () => {
    if (Object.keys(profileUser).length) {
      const result = await axios.get(`api/user/following/${profileUser._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowing(result.data);
    }
  };

  useEffect(() => {
    getFollowers();
    getFollowing();
  }, [profileUser]);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="followersComponent m-4 mx-4">
      {activeTab === "following" &&
        following?.map((user, index) => {
          return (
            <UserRow
              key={user?._id || index}
              user={user}
              handleUserClick={handleUserClick}
            ></UserRow>
          );
        })}
      {activeTab === "followers" &&
        followers?.map((user, index) => {
          return (
            <UserRow
              user={user}
              key={user?._id || index}
              handleUserClick={handleUserClick}
            ></UserRow>
          );
        })}
    </div>
  );
}

export default Followers;
