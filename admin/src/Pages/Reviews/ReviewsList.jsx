import React from 'react';
import {useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import axios from '../../utils/axios';
import { setReviews } from '../../Redux/store';
import { useState } from 'react';
import {useDispatch } from 'react-redux'
function PostsList() {

    const reviews = useSelector(state=> state.reviews);
    const token = useSelector(state=> state.token);
    const dispatch = useDispatch();

    const getAllReviews = () => {
        axios.get('api/admin/getAllReviews',{
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
            }
        })
          .then((response) => {
            dispatch(setReviews({ reviews: response.data }))
          })
          .catch((error) => {
            console.log("inside catch");
            console.log(error);
          });
    };

    useState(()=>{
        getAllReviews();
    },[])

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className='postMain p-5'>
        <span className='fs-1 text-secondary'>REVIEWS</span>
                    <TableContainer component={Paper} className="table shadow p-3">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          
                          <TableCell className="tableCell">No</TableCell>
                          <TableCell className="tableCell">Username</TableCell>
                          <TableCell className="tableCell">Movie Id</TableCell>
                          <TableCell className="tableCell">rating</TableCell>
                          <TableCell className="tableCell">review</TableCell>
                          <TableCell className="tableCell">Posted On</TableCell>
                          <TableCell className="tableCell">action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {
                            reviews.map((review,index)=>{
                                return (
                                    <ReviewCard review={review} index={index} getAllReviews={getAllReviews} />
                            )})
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
    </div>
    </div>
  </div>

  )
}

export default PostsList