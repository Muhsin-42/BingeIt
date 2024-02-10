import React, { useEffect } from "react";
import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";

import { setReviews } from "../../Redux/store";
import Swal from "sweetalert2";

function ReviewSection({ movieDetails, currentUser }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const token = useSelector((state) => state.token);

  const getReviews = async () => {
    try {
      const response = await axios.get(`api/user/review/${movieDetails.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setReviews({ reviews: response.data }));
    } catch (error) {
      console.log("344 => ", error);
    }
  };
  const handleDeleteReview = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`api/user/review/${reviewId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        getReviews();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    movieDetails && getReviews();
  }, [movieDetails]);

  return (
    <div className="reviewSection">
      <div className="reviewTop">
        <span className=" fs-1 text-white">Reviews ({reviews?.length})</span>
        <AddReview movieDetails={movieDetails}></AddReview>
      </div>
      <div className="reviewCards">
        {movieDetails &&
          Array.isArray(reviews) &&
          reviews?.map((review) => (
            <ReviewCard
              key={review?._id}
              review={review}
              currentUser={currentUser}
              handleDeleteReview={handleDeleteReview}
              movieDetails={movieDetails}
            />
          ))}
      </div>
    </div>
  );
}

export default ReviewSection;
