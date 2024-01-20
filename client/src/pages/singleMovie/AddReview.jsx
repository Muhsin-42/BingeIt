import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";

import { setReviews } from "../../Redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddReview({ movieDetails }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const notify = () => toast.success("Review posted");
  const notifyMinimun = () =>
    toast.warn("Review should be at least 5 character.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const notifyEmptyRating = () =>
    toast.error("Please rate the movie", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const notifyReviewExists = () =>
    toast.error("Your review already exists", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rating === 0) {
        notifyEmptyRating();
        return;
      }

      if (reviewMessage === "" || reviewMessage.trim().length < 5) {
        notifyMinimun();
        return;
      }

      const result = await axios.post(
        `api/user/review/${currentUser._id}/${movieDetails.id}`,
        {
          rating,
          reviewMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result) {
        notify();
        setRating(0); // Clear rating state
        setReviewMessage(""); // Clear reviewMessage state
        setCharacterCount(0);
        dispatch(setReviews({ reviews: result.data }));
      }
    } catch (error) {
      notifyReviewExists();
      console.log("eeeee ", error.response.data.reviewExists);
    }
  };

  const handleReviewChange = (e) => {
    if (e.target.value.length <= 200) {
      setReviewMessage(e.target.value);
      setCharacterCount(e.target.value.length);
    }
  };

  return (
    <div>
      <ToastContainer autoClose={1300} />
      <button
        type="button"
        className="btn btn-outline-danger"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Add Review
      </button>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h1 className="modal-title fs-1 m-0 p-0" id="exampleModalLabel">
                {movieDetails?.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  {/*  */}
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    style={{ fontSize: "40px" }}
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />

                  {/*  */}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="message-text"
                    className="col-form-label w-100"
                  >
                    <div className="d-flex justify-content-between w-100">
                      <span className="">Review:</span>
                      <span className="">{characterCount}/200</span>
                    </div>
                  </label>
                  <textarea
                    className="form-control"
                    value={reviewMessage}
                    onChange={handleReviewChange}
                    id="message-text"
                  ></textarea>
                </div>
                <div className="modal-footer ">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modalT"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
