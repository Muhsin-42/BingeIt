import React, { useEffect, useState } from "react";
import "./profileTop.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import bg from "./../../assets/images/bg.jpg";
import dp from "./../../assets/images/dp.jpg";
import axios from "../../utils/axios";
import { setUser } from "../../Redux/store";
import ProfilePics from "./ProfilePics";
import NameUsername from "./NameUsername";
import ProfileMovies from "../profileMovies/ProfileMovies";
import Followers from "../followers/Followers";
import EditProfile from "./EditProfile";
let friendDetails;

function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("movie"); //    movie | followers | following
  const [loading, setLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [friend, setFriend] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isFriend, setIsFriend] = useState(false);
  const [following, setFollowing] = useState(false);
  const token = useSelector((state) => state.token);
  const currentUserRedux = useSelector((state) => state.user);
  const { id } = useParams();

  const handleFollow = async (friendId) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `api/user/follow/${id}`,
        { currentUser: currentUserRedux._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser({ user: response.data }));
      setLoading(false);
      const notificationData = {
        type: "follow",
        notificationFor: Object(id),
        notificationBy: Object(currentUserRedux._id),
        notificationMessage: "followed you",
      };
      await axios.post(
        `api/notification/follow/${id}`,
        { notificationData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async (friendId) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `api/user/unfollow/${id}`,
        { currentUser: currentUserRedux._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser({ user: response.data }));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`api/user/user/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      friendDetails = response.data;
      setFriend(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  useEffect(() => {
    if (friend._id?.toString() === currentUserRedux._id?.toString()) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [friend]);

  useEffect(() => {
    if (currentUserRedux.following.includes(friend._id)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [following, friend, loading]);

  const toggleFollow = () => {
    if (following) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const toggleInfoBar = (type) => {
    setActiveTab(type);
  };

  return (
    <div id="profile">
      <ProfilePics
        bg={bg}
        dp={dp}
        currentUserRedux={currentUserRedux}
        profileUser={friend}
      />

      <div className="nameUsernameFollow  ">
        <NameUsername friend={friendDetails} />

        {/* Follow / UnFollow / Edit */}
        <div className="right">
          {currentUserRedux._id !== friend._id && (
            <>
              {
                <button
                  className="btn btn-outline-primary"
                  onClick={toggleFollow}
                >
                  {" "}
                  {following ? "Unfollow" : "follow"}{" "}
                </button>
              }
            </>
          )}
          {currentUserRedux._id === friend._id && (
            <>
              <EditProfile open={editProfile} setOpen={setEditProfile} />
              <button
                className="btn btn-outline-primary"
                onClick={(e) => setEditProfile(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {/* <InfoBar friend={friend} /> */}
      <div className="infoBar  mt-4 row ">
        <div
          onClick={() => toggleInfoBar("movie")}
          className="card-1 col col-12 col-lg-3 col-md-12 col-sm-12"
          style={{
            background: activeTab === "movie" ? "white" : "#272727",
            color: activeTab === "movie" ? "black" : "white",
            pointerEvents: activeTab === "movie" ? "none" : "auto",
          }}
        >
          Movies <br />
          {friend?.watched?.length}
        </div>

        <div
          onClick={() => toggleInfoBar("followers")}
          className="card-2 col col-6 col-lg-2 col-md-6 col-sm-6"
          style={{
            background: activeTab === "followers" ? "white" : "#272727",
            color: activeTab === "followers" ? "black" : "white",
            pointerEvents: activeTab === "followers" ? "none" : "auto",
          }}
        >
          Followers
          <br />
          {Object.keys(friend)?.length ? friend?.followers?.length : "0"}
        </div>

        <div
          onClick={() => toggleInfoBar("following")}
          className="card-3 col col-6 col-lg-2 col-md-6 col-sm-6"
          style={{
            background: activeTab === "following" ? "white" : "#272727",
            color: activeTab === "following" ? "black" : "white",
            pointerEvents: activeTab === "following" ? "none" : "auto",
          }}
        >
          Following
          <br />
          {Object.keys(friend)?.length ? friend?.following?.length : "0"}
        </div>

        <div className="card-4 col col-6 col-lg-3 col-md-6 col-sm-6">
          Watch Hours
          <br />
          23hr 45mins
        </div>
        <div className="card-5 col col-6 col-lg-2 col-md-6 col-sm-6">Sats</div>
      </div>

      {activeTab === "movie" ? (
        <ProfileMovies friend={friend} />
      ) : activeTab === "followers" ? (
        <Followers
          profileUser={friend}
          currentUser={currentUserRedux}
          activeTab={activeTab}
        />
      ) : (
        <Followers
          profileUser={friend}
          currentUser={currentUserRedux}
          activeTab={activeTab}
        />
      )}
    </div>
  );
}

export default Profile;
