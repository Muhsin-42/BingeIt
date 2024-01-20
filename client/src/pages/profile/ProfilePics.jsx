import React, { useEffect, useRef, useState } from "react";
import "./profileTop.scss";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/store";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePics({ bg, dp, profileUser }) {
  const dispatch = useDispatch();
  const currentUserRedux = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [imageUpload, setImageUpload] = useState(null);
  const fileInputRef = useRef(null);

  const notify = () => toast.success("Profile pic updated");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    // handle the file upload logic here
    const file = event.target.files[0];
    notify();
    setImageUpload((prev) => file);
  };

  const updateProfilePic = async (uploadImageName) => {
    try {
      const result = await axios.patch(
        `api/user/profile-pic/${currentUserRedux._id}`,
        { data: uploadImageName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result) {
        dispatch(setUser({ user: result.data }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (imageUpload) {
      const uploadImageName = currentUserRedux.username;
      const imageRef = ref(storage, `profilePicture/${uploadImageName}`);
      uploadBytes(imageRef, imageUpload).then((response) => {
        getDownloadURL(imageRef)
          .then((url) => {
            updateProfilePic(url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      });
    }
  }, [imageUpload]);

  return (
    <div className="profilePics">
      <div className="bgPic" style={{ backgroundImage: `url(${bg}) ` }}>
        <i id="editIcon" className="bi bi-pencil-square"></i>
      </div>

      <div
        className="profile-pic"
        style={{
          backgroundImage: profileUser.profilePicture
            ? `url(${profileUser.profilePicture})`
            : "url(userPlaceholder)",
          backgroundSize: "cover",
        }}
      >
        {profileUser?._id?.toString() === currentUserRedux?._id?.toString() && (
          <div
            id="upload-div"
            onClick={handleUploadClick}
            className="edit-layout"
          >
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            <i className="bi bi-camera-fill"></i>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default React.memo(ProfilePics);
