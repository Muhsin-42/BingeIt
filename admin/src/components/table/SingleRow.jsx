import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import axios from "../../utils/axios";
import Swal from 'sweetalert2'
import socket from '../../socket.io/socket.io';

function SingleRow({user,index}) {

    const [blocked,setBlocked] = useState(false)
    const [buttonText,setButtonText] = useState('BLOCK')
    

    useEffect(()=>{
        user?.isActive ? setBlocked(false) : setBlocked(true); 
    },[])


    const blockUser = (id) => {

        Swal.fire({
          title: 'Are you sure?',
          text: "You want to block this user!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Block User!'
        }).then(async (result) => {
    
          try{
            const response = await axios.patch(`api/admin/blockUser/${id}`)
            
            if (response.status===200 && result.isConfirmed) {
                setBlocked(true);
              Swal.fire(
                'Blocked!',
                'The user has been Blocked',
                'success'
              )

              const socketData = {
                fromSocket: true,
                receiverId : id,
                type: 'blocked',
                blocked: true
              };
            socket.emit("setBlocked", socketData )


            }else{
              Swal.fire(
                'Failed',
                'Failed to Block the user',
                'error'
              )
            }
    
          }catch(error){
            console.log('blockUser error => ',error);
          }
        })
    };
      
    const unblockUser = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to unBlock this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unBlock User!'
      }).then(async (result) => {
  
        try{
          const response = await axios.patch(`api/admin/unblockUser/${id}`)
          
          if (response.status===200 && result.isConfirmed) {
            setBlocked(false);
            Swal.fire(
              'unBlocked!',
              'The user has been unBlocked',
              'success'
            )
          }else{
            Swal.fire(
              'Failed',
              'Failed to unBlock the user',
              'error'
            )
          }
  
        }catch(error){
          console.log('blockUser error => ',error);
        }
      })
    };
      

  return (
    <>
                <TableRow key={index +1}>
              <TableCell className="tableCell">{index +1}</TableCell>
              <TableCell className="tableCell">{user.username}</TableCell>
              <TableCell className="tableCell">{user.email}</TableCell>
              <TableCell className="tableCell">{user.phone}</TableCell>
              <TableCell  align="left">
                {
                    blocked ? 
                      <Button
                        className="btn btn-outline-danger"
                        onClick={() =>unblockUser (user._id)}
                        variant="contained"
                        color="error"
                      >
                        UN BLOCK
                      </Button>
                    :
                      <Button
            
                        onClick={() => blockUser(user._id)}
                        variant="outlined"
                        color="error"
                      >
                        BLOCK
                      </Button>

                }
                  </TableCell>
            </TableRow>
    </>
  )
}

export default SingleRow