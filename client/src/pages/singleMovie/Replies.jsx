import React, { useEffect, useState } from 'react'
import ReplyCard from './ReplyCard'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import axios from '../../utils/axios'
import { ToastContainer, toast } from 'react-toastify';
import socket from '../../socket.io/socket.io';
import { resolvePath } from 'react-router-dom';

function Replies({review,movieDetails}) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const [replyMsgInput,setReplyMsgInput] = useState('');
    const [replies,setReplies] = useState();
    const [socketReplies,setSocketReplies] = useState({});


  

    const notifyEmptyReply = () => toast.error("Reply Cannot be empty", {
        position: toast.POSITION.TOP_RIGHT
      });

    const getReplies = async () =>{
        try {
            const response = await axios.get(`api/user/reply/${review._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            setReplies(response.data);
        } catch (error) {
            
        }
    }

    const handlePostReply = async (e) =>{
        e.preventDefault();
        try {

            if(replyMsgInput =='' || replyMsgInput.trim() == '')
            {
                notifyEmptyReply();
                return;
            }

            const response = await axios.post(`api/user/reply/${review._id}/${currentUser._id}`,{data:replyMsgInput}, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });

            setReplies(prev => response.data);
            setReplyMsgInput('')

            if(currentUser._id != review.userId._id){
                const notificationData = {
                    type: 'replied',
                    movieId : review.movieId,
                    movieTitle: movieDetails.title,
                    reviewId : Object(review._id),
                    notificationFor: Object(review.userId._id),
                    notificationBy: Object(currentUser._id),
                    notificationMessage: 'replied to your review',
                  }
                  const postNotification = await axios.post(`api/notification/follow/${review.userId._id}`,{notificationData}, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                });
                // socket
                const socketData = {
                    fromSocket: true,
                    senderId: currentUser._id,
                    receiverId: review.userId._id,
                    type: 'replied',
                    reply : response.data[0].replyMessage,
                    _id: response.data[0]._id,
                    movieId : review.movieId,
                    movieTitle: movieDetails.title,
                    reviewId : Object(review._id),
                    notificationMessage: 'replied to your review',
                    senderName: currentUser.name,
                    senderUsername: currentUser.username,
                    senderProfile : currentUser.profilePicture,
                    createdAt : response.data[0].createdAt
                };
                socket.emit("sendNotification", socketData )
            }

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        review && getReplies();
    },[review]);


  return (
    <div className="replyMain bg-dark pb-3">

    <ToastContainer />

    <form onSubmit={handlePostReply} className="add-reply-main row mb-4">
        <div className="img col col-2 col-lg-2">
            <img className='' src={currentUser?.profilePicture} alt="" />
        </div>
        <input className='col col-6 col-lg-7' value={replyMsgInput} onChange={(e)=>setReplyMsgInput(e.target.value)}   type="text" placeholder='type something here' name="" id=""  />
        <button type='submit'  className='col col-2 col-lg-2 btn btn-outline-danger'>reply</button>
    </form>


    {/* replise */}
    {
        replies &&
        replies?.map((reply)=>{
            return <ReplyCard key={reply._id} currentUser={currentUser} reply={reply} />
        })
    }




    </div>
  )
}

export default Replies