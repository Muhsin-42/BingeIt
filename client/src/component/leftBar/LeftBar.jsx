import React, { useContext, useEffect, useState } from 'react'
import './leftBar.scss'
import logo from './../../assets/images/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setLogout } from "../../Redux/store";
import { logoutPost } from "../../utils/constants";
import axios from '../../utils/axios'
// import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Badge from '@mui/material/Badge';
import socket from '../../socket.io/socket.io';
import Diversity2Icon from '@mui/icons-material/Diversity2';
// import { AuthContext } from '../../context/authContext';



function LeftBar() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const [notifications,setNotifications] = useState([]);
  const [newNotifications,setNewNotifications] = useState({});
  const [notificationsCount,setNotificationsCount] = useState(0);
  const token = useSelector(state => state.token);

  useEffect(() => {
      socket.on("getNotification", (data) => {
          setNewNotifications(data);
      });
  }, []);

  useEffect(()=>{
    if (Object.keys(newNotifications).length ) {
      setNotifications((prev)=> [...prev,newNotifications])
    } 
  },[newNotifications]);

  useEffect(()=>{
    setNotificationsCount(prev=> 0);
    notifications?.map((notification)=>{
      if(!notification.read) setNotificationsCount(prev=> ++prev) 
    })    
  },[notifications]);
  
  const getNotifications = async () => {
    try {
      const response = await axios.get(`api/notification/notifications/${currentUser._id}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data)
    } catch (error) {
      
    }
}

useEffect(()=>{
  getNotifications();
},[currentUser]);


  return (
    <div className="safetyLeftBar">
      <div className='leftBar'>

      {/* Logo & Title */}
        <div className="logoDiv mt-3">
          <img src={logo} alt="" />
          <h2>Binge!</h2>
        </div>
        <span className="line mt-3"></span>
        
        {/* search bar */}
        {/* <input type="text" className="searchBar m-3" placeholder='Search for a movie!' />
        <i id='searchSvg' className="bi bi-search"></i> */}

        {/*  */}
        
        <ul>
          <li>
            <Link className="link" to='home'>
              <i className="bi bi-house-door"></i>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to='discover'>
            <i className="bi bi-compass"></i>
              Discover
            </Link>
          </li>
          <li>
            <Link className="link" to='/watchlist'>
              <i className="bi bi-bookmarks"></i>
              Watchlist
            </Link>
          </li>
          <li>
            <Link className="link" to='trending' >
              <i className="bi bi-fire"></i>
              Trending
            </Link>
          </li>
          <li>
            <Link className="link" to='circle' >
              <Diversity2Icon className='icons'/>
              Circle
            </Link>
          </li>
          <li>
            <Link className="link" to='chat' >
              <Diversity3Icon className='icons'/>
              Community
            </Link>
          </li>
          <li>
            <Link className="link"  to='Notification'>
            <Badge color="secondary" badgeContent={notificationsCount} max={909}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}>
              <i className="bi bi-bell"></i>
              </Badge>
              Notifications
            </Link>
          </li>
          <li>
            <Link className="link"  to={`profile/${currentUser._id}`}>
              <i className="bi bi-person-circle"></i>
              {currentUser.username}
            </Link>
          </li>
          <li onClick={()=>{  dispatch(setLogout()) }} >
            <i className="bi bi-box-arrow-left"></i>
              Logout
          </li>
        </ul>
      </div>
    </div>
  )

}
 
export default LeftBar