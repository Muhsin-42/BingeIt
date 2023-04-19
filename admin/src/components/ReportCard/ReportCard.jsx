import React from 'react'
import Swal from 'sweetalert2'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../utils/axios';
import { setPosts } from '../../Redux/store';

function PostSingleCard({report,index,getAllReports}) {

    const dispatch = useDispatch();
    const token = useSelector(state=> state.token);

    const deletePost = (postId) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete the post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
          }).then(async (result) => {
            if(result.isConfirmed){
                try{
                  const response = await axios.delete(`api/post/post/${postId}`,
                  {adminRequest:true,
                    headers:{
                        "Content-type" : 'application/json',
                        "Authorization" : `Bearer ${token}`
                    }
                  })

                //   getAllPosts();
                //   dispatch(removeReview({reviewId: review._id}));
                  
                  if (response.status===200) {
                    Swal.fire(
                      'Deleted',
                      'The Post is deleted',
                      'success'
                    )
                    // dispatch(setReviews({reviews: response.data}))
                  }else{
                    Swal.fire(
                      'Failed',
                      'Failed to delete the post',
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
                <TableCell className="tableCell">
                    <img src={report.image} height={50} width={50} alt="" />
                </TableCell>
              <TableCell className="tableCell">{report.content}</TableCell>
              <TableCell className="tableCell">{report.count}</TableCell>
              {/* <TableCell className="tableCell">{report.reportedBy.map((user)=>'@'+user.username+', ').slice(0, -1)}</TableCell> */}
              {/* <TableCell className="tableCell">{report.reasons.map((reason)=>reason+', ')}</TableCell> */}
              <TableCell className="tableCell">{report.reportedBy.map((user, i)=>  (i === report.reportedBy.length-1) ? '@'+user.username : '@'+user.username+' | ')}</TableCell>
              <TableCell className="tableCell">{report.reasons.map((reason, i)=>(i === report.reasons.length-1) ? reason : reason+' | ')}</TableCell>

              <TableCell  align="left">
                {

                    !report.isDelete ? <button onClick={()=>deletePost(report._id)} className='btn btn-outline-danger'>DELETE POST</button>
                    :                  <button  className='btn btn-danger disabled'>DELETED</button>
                  
                }
                  </TableCell>
            </TableRow>
    </>
  )
}

export default PostSingleCard