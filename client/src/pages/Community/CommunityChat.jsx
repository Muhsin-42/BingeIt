import React, { useState, useRef, useEffect } from 'react'
import './chat.scss'
import CreateGroup from './CreateGroup';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setGroups, addGroup, pushMessages } from '../../Redux/store';
import MessagesSection from './MessagesSection';
import socket from '../../socket.io/socket.io';
import { API_KEY } from '../../utils/constants';
import { addDoc, collection, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


const CommunityChat = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const [inputValue, setInputValue] = useState("");
    const messageRef = collection(db, "GroupA")
    const token = useSelector(state => state.token);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const groups = useSelector(state => state.groups);

    const [isLeftMainVisible, setIsLeftMainVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 600) {
            setIsLeftMainVisible(false);
          } else {
            setIsLeftMainVisible(true);
            setIsMobileMenuOpen(false);
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsLeftMainVisible(!isLeftMainVisible);
      };


    // Send Message
    async function handleSendMessage() {
        if (inputValue.trim() !== "") {

            let newMessage = {
                group: selectedGroup?.name,
                groupDp: selectedGroup?.image,
                sender: currentUser?._id,
                senderUsername: currentUser?.username,
                senderDp: currentUser?.profilePicture,
                type: 'text',
                text: inputValue,
                createdAt: serverTimestamp(),
            }

            await addDoc(messageRef, newMessage)
            setInputValue("");
        }
    }



    //Getting all group from server
    const getAllGroups = async () => {
        const response = await axios.get('api/chat/group', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch(setGroups({ groups: response?.data }));
    }


    useEffect(() => {
        getAllGroups();
    }, []);


    

    return (
        <div className='chatMain  shadow-lg'>

            {isMobileMenuOpen && (
                <i class="bi bi-three-dots mt-3 mx-3 " onClick={toggleMobileMenu}></i>
            )}

            {isLeftMainVisible && (
                <div className="left-main shadow-lg " style={{ position: 'relative' }}>
                    <div className="title fs-3">Communities</div>
                    <div className="channels ">
                        {
                            console.log('grous',groups)
                        }
                        {
                            Array.isArray(groups) &&
                            groups?.map((group, index) => {
                                return (
                                    <div className="singleChannel" key={group?._id} onClick={() => { setSelectedGroup(group); toggleMobileMenu(); }}>
                                        <div className="img" style={{ height: '50px', width: '50px', backgroundImage: `url(${group?.image})`, backgroundSize: 'cover', borderRadius: '50%' }}></div>
                                        <span className='d-block'>{group?.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <CreateGroup />
                </div>
            )}

            {!isLeftMainVisible && (
                    <i className="bi bi-list mx-3 mt-3" onClick={toggleMobileMenu}></i>
            )}

            <div className="right-main">
                <div className="chat-container">

                    <MessagesSection selectedGroup={selectedGroup} />

                    {/* //MessageInput */}
                    <div className="chat-footer">
                        <input type="text" placeholder="Type your message here" value={inputValue} autoComplete='off'
                            onChange={(event) => setInputValue(event.target.value)}
                            onKeyDown={(event) => { if (event.key === 'Enter') handleSendMessage() }} />
                        <button onClick={handleSendMessage}>  <i className="bi bi-send-fill"></i> </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CommunityChat
