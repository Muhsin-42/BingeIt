import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Swal from 'sweetalert2'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PostSingleCard from '../../components/PostSingleCard/PostSingleCard';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { setReports } from '../../Redux/store';
import axios from '../../utils/axios'
import ReportCard from '../../components/ReportCard/ReportCard'
function PostsList() {

    const dispatch = useDispatch();
    const reports = useSelector(state=> state.reports);
    const token = useSelector(state=> state.token);

    const getAllReports = () => {
        axios.get('api/admin/getAllReports',{
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
            }
        })
          .then((response) => {
            dispatch(setReports({ reports: response.data }))
          })
          .catch((error) => {
            console.log(error);
          });
    };

    useState(()=>{
        getAllReports();
    },[])
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className='postMain p-5'>
        <span className='fs-1 text-secondary'>REPORTS</span>
                    <TableContainer component={Paper} className="table shadow p-3">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          
                          <TableCell className="tableCell">No</TableCell>
                          <TableCell className="tableCell">Post</TableCell>
                          <TableCell className="tableCell">Content</TableCell>
                          <TableCell className="tableCell">Total Reports</TableCell>
                          <TableCell className="tableCell">ReportedBy</TableCell>
                          <TableCell className="tableCell">REPORTS</TableCell>
                          <TableCell className="tableCell">action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {
                            reports?.map((report,index)=>{
                                return (
                                    // <h1>hehe</h1>
                                  <ReportCard report={report} getAllReports={getAllReports} index={index} />
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