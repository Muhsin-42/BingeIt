import { useEffect, useRef, useState } from 'react'
import './chat.scss'
import { useSelector } from 'react-redux';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import moment from 'moment'
const MessagesSection = ({ selectedGroup }) => {

  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector(state => state.user);
  const messageRef = collection(db, "GroupA");

  useEffect(() => {
    if (selectedGroup) {
      const queryMessages = query(messageRef, where("group", "==", selectedGroup?.name), orderBy("createdAt"))
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let latestMessages = [];
        snapshot.forEach((doc) => {
          latestMessages.push({ ...doc.data(), id: doc.id })
        })
        setMessages(latestMessages);
      });

      return () => unsubscribe();

    }
  }, [selectedGroup]);


  // To Scroll
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <>

      <div className="chat-header fs-3 font-weight-bold"> {selectedGroup?.name}</div>
      <div className="chat-content" ref={chatContainerRef}>
        {
          messages.map((message) => {
            let myMessage = currentUser._id === message?.sender;
            return (
              <div key={message.id} className={`single-message ${myMessage ? 'myMessage' : ''}`} >
                {
                  !myMessage &&
                  <div className="left">
                    <img src={message?.senderDp} alt="" />
                  </div>
                }
                <div className="right">
                  <div className="level1">
                    <span className="username font-weight-bold">{message?.senderUsername}</span>
                    <span className={`time `}>{message.createdAt && moment(message.createdAt?.seconds * 1000).format('hh:mm')}</span>
                  </div>
                  <div className="level2">
                    <span className='message-text'>{message?.text}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </>
  )
}

export default MessagesSection