import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import { useState } from 'react';
import Swal from 'sweetalert2'
import {useSelector, useDispatch} from 'react-redux';
import { setReviews,removeReview } from '../../Redux/store';
import axios from '../../utils/axios'

function ReviewCard({review,index,getAllReviews}) {

    const token = useSelector(state => state.token);
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();
    const deleteReview = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete the review!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
          }).then(async (result) => {
            if(result.isConfirmed){
                try{
                  const response = await axios.delete(`api/user/review/${review._id}`,
                  {adminRequest:true,
                    headers:{
                        "Content-type" : 'application/json',
                        "Authorization" : `Bearer ${token}`
                    }
                  })
                  console.log('rev ',reviews)
                  getAllReviews();
                  dispatch(removeReview({reviewId: review._id}));
                  console.log('rev ',reviews)
                  
                  if (response.status===200) {
                    Swal.fire(
                      'Deleted',
                      'The Review is deleted',
                      'success'
                    )
                    // dispatch(setReviews({reviews: response.data}))
                  }else{
                    Swal.fire(
                      'Failed',
                      'Failed to delete the review',
                      'error'
                    )
                  }
          
                }catch(error){
                  console.log('blockUser error => ',error);
                }
            }
          })
    } 




  return (
    <>
            <TableRow key={index +1}>
              <TableCell className="tableCell">{index +1}</TableCell>
              <TableCell className="tableCell">{review.userId.username}</TableCell>
              <TableCell className="tableCell"> {review.movieId} </TableCell>
              <TableCell className="tableCell"> {review.rating} </TableCell>
              <TableCell className="tableCell">{review.reviewMessage}</TableCell>
              <TableCell className="tableCell">{new Date(review.createdAt).toLocaleDateString()}</TableCell>
              <TableCell  align="left">
                {
                      <Button
                        className="btn btn-outline-danger"
                        onClick={() =>deleteReview()}
                        variant="outlined"
                        color="error"
                      >
                        DELETE
                      </Button>
                }
                  </TableCell>
            </TableRow>
    </>
  )
}

export default ReviewCard