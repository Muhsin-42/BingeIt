import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import UserRow from '../../component/userRow/UserRow';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Followers({profileUser,currentUser,activeTab}) {

  const [followers,setFollowers] = useState([])
  const [following,setFollowing] = useState([])
  const token = useSelector(state => state.token);
  const navigate = useNavigate();  

  const getFollowers = async () =>{
    if(Object.keys(profileUser).length){
      const result =  await axios.get(`api/user/followers/${profileUser._id}`,{
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    });
      setFollowers(result.data)
    }
  }
  
  const getFollowing = async () =>{
    if(Object.keys(profileUser).length){
      const result =  await axios.get(`api/user/following/${profileUser._id}`,{
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    });
      setFollowing(result.data)
    }
  }

  useEffect(()=>{
      getFollowers();
      getFollowing();
  },[profileUser]);
  


  const handleUserClick = (userId)=>{
    navigate(`/profile/${userId}`)
  }
  return (
    <div className='followersComponent m-4 mx-4' >
      {
        activeTab == 'following' && following?.map((user)=>{
          return (
            // <h1>{user?.username}</h1>
            <UserRow user={user} handleUserClick={handleUserClick}></UserRow>
          )
        })
      }
      {
        activeTab == 'followers' && followers?.map((user)=>{
          return (
            // <h1>{user?.username}</h1>
            <UserRow user={user} handleUserClick={handleUserClick}></UserRow>
          )
        })
      }
    </div>
  )
}

export default Followers