import React, { useState } from 'react'
import './chat.scss'
import { useSelector} from 'react-redux';
import TimeAgo from 'timeago.js';

const MessagesSection = ({message}) => {

    
    const [inputValue, setInputValue] = useState("");
    const token = useSelector(state => state.token);
    const currentUser = useSelector(state => state.user);
    const myMessage = currentUser._id === message.sender._id;
    // console.log('message ',message);
    const timeAgo = new TimeAgo();

 


  return (
    <>
   
                <div className={`single-message ${myMessage ? 'myMessage':'' }`} >
                {
                    !myMessage &&
                        <div className="left">
                        <img src={message.sender.profilePicture} alt="" />
                        </div>
                }
                <div className="right">
                <div className="level1">
                    <span className="username font-weight-bold">{message?.sender?.username}</span>
                    <span className="time">{timeAgo.format(message.createdAt)}</span>
                </div>
                <div className="level2">
                    <span className='message-text'>{message.text}</span>
                </div>
                </div>
                
                </div>

    </>
  )
}

export default MessagesSection