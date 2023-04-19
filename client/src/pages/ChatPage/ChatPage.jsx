import React, { useState, useRef, useEffect } from 'react'
import './chat.scss'
import CreateGroup from './CreateGroup';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setGroups, addGroup, pushMessages } from '../../Redux/store';
import MessagesSection from './MessagesSection';
import socket from '../../socket.io/socket.io';


const ChatPage = () => {

  const currentUser = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const groups = useSelector(state => state.groups);

  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);


  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  async function handleSendMessage() {
    if (inputValue.trim() !== "") {

      const now = new Date();
      const formattedTime = now.toISOString();
      let newMessage = {
        fromSocket: true,
        senderId: currentUser._id,
        selectedCommunity: selectedGroup._id,
        _id: formattedTime,
        type: 'text',
        text: inputValue,
        createdAt: formattedTime,
        sender: {
          _id: currentUser._id,
          username: currentUser.username,
          profilePicture: currentUser.profilePicture
        }
      }
      let tempMessages = {
        ...selectedGroup,
        messages: [...selectedGroup.messages, newMessage]
      };
      dispatch(pushMessages({newMessage}))

      setSelectedGroup(tempMessages);
      socket.emit("sendMessage", newMessage ) 


      let text = inputValue;
      setInputValue("");

      await axios.post(`api/chat/${selectedGroup._id}/messages`, { userId: currentUser._id, text: text }
        , {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
    }
  }
  
  // To Scroll
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [selectedGroup]);


  const getAllCommunities = async () => {
    const response = await axios.get('api/chat/group', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch(setGroups({ groups: response.data }));
  }

  useEffect(() => {
    getAllCommunities();
  }, []);



  useEffect(() => {
    socket.on("receiveMessage", (data) => {   
      dispatch(pushMessages({newMessage : data}))
    });
  }, [selectedGroup]);



  useEffect(()=>{
    setSelectedGroup(groups[selectedGroupIndex?selectedGroupIndex:0]);
  },[groups]);
  


  return (
    <div className='chatMain  shadow-lg'>

      <div className="left-main shadow-lg" style={{ position: 'relative' }}>
        <div className="title fs-3">Communities</div>
        <div className="channels">
          {
            groups &&
            groups.map((group,index) => {
              return (
                <div className="singleChannel" key={group._id}  onClick={() => { setSelectedGroup(group); setSelectedGroupIndex(index) }}>
                  <div className="img" style={{  height: '50px',  width: '50px',  backgroundImage: `url(${group.image})`,  backgroundSize: 'cover',  borderRadius: '50%'}}></div>
                  <span className='d-block'>#{group.name}</span>
                </div>
              )
            })
          }
        </div>
        <CreateGroup />
      </div>


      <div className="right-main">

        <div className="chat-container">


          <div className="chat-header fs-3 font-weight-bold">#{selectedGroup?.name}</div>
          <div className="chat-content" ref={chatContainerRef}>
            {selectedGroup?.messages?.map((message) => (

              <MessagesSection key={message._id} message={message} />

            ))}
          </div>



          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message here"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              autoComplete='off'

            />
            <button onClick={handleSendMessage}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage