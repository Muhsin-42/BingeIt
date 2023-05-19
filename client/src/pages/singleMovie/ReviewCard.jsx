    import React, { useEffect, useState } from 'react'
    import './reviewCard.scss'
    import moment from 'moment';
    import Rating from '@mui/material/Rating'
    import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
    import ThumbUpIcon from '@mui/icons-material/ThumbUp';
    import CommentIcon from '@mui/icons-material/Comment';
    import DeleteIcon from '@mui/icons-material/Delete';
    import FlagIcon from '@mui/icons-material/Flag';
    import Badge from '@mui/material/Badge';
    import { styled } from '@mui/material/styles';
    import IconButton from '@mui/material/IconButton';
    import axios from '../../utils/axios'

    import { useSelector } from 'react-redux';
    import { useDispatch } from "react-redux";
    import { setReviews } from '../../Redux/store';
    import Replies from './Replies';

    function ReviewCard({review,currentUser,handleDeleteReview,movieDetails}) {

        const dispatch = useDispatch();
        const reviews = useSelector(state => state.reviews);
        const token = useSelector(state => state.token);
        const [replies,setReplies] = useState([]);
        const [showReply,setShowReply] = useState(false);

        

        const handleDelete = () =>{
            handleDeleteReview(review._id)
        }

        const handleLike = async ()=>{
            try {
                const response = await axios.patch(`api/user/like-review/:${review._id}/${currentUser._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } catch (error) {
                
            }
        }

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
        useEffect(()=>{
            getReplies();
        },[])

        

        const handleReplyToggle = () =>{
            setShowReply(prev=>!prev)
        }

        
    return (
        <div className='reviewCardMain'>
            <div className="review">
                <div className="left">
                    {/* image */}
                    <img src={review?.userId?.profilePicture} alt="" />
                </div>
                <div className="right w-100">
                    {/* name time rating review */}
                    <div className="set1">
                        {/* name time */}
                        <span className="name fs-3 font-weight-bold">{review?.userId.name}</span>
                        <span className="time">{ moment(review?.createdAt).fromNow()  }</span>
                    </div>
                    <div className="set2">
                        {/* rating */}
                        <span>@{review?.userId.username}</span>
                        <Rating className='mt-3' name="read-only" value={parseInt(review?.rating)} readOnly />
                    </div>
                    <div className="set3 ">
                        {/* review */}
                        <span className='reviewMessage fs-4' >{review?.reviewMessage }</span>
                    </div>
                    <div className="set4 mt-3">
                        <ThumbUpOutlinedIcon onClick={handleLike} className="icons thumb-up-icon"  />
                        {/* <ThumbUpIcon className="thumb-up-icon"  /> */}
                        <Badge color="secondary" badgeContent={replies.length} showZero={false} style={{zIndex: 5}}>
                                <CommentIcon onClick={handleReplyToggle} className='icons'/>
                        </Badge>
                        {
                            currentUser?._id == review?.userId._id.toString() ?
                            <DeleteIcon onClick={handleDelete} className='icons'/>
                            :
                            <FlagIcon className='icons'/>
                        }
                    </div>
                </div>
            </div>
            
            {
                    showReply &&
                    <Replies review={review} movieDetails={movieDetails}  />
            }
        </div>
    )
    }

    export default ReviewCard