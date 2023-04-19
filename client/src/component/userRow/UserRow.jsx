import React, { useEffect, useState } from 'react'
import './userRow.scss'
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setUser } from '../../Redux/store';
import userPlaceHolder from '../../assets/images/user-placeholder.jpg'
import Avatar from '@mui/material/Avatar'
import { blue, green, pink, yellow } from '@mui/material/colors';

function UserRow({user,handleUserClick}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  const [following,setFollowing] = useState('follow');
  const [followClick,setFollowClick] = useState(false);

  const stringAvatar = (name) => {
    const colors = [pink[400], blue[400], green[400], yellow[400]];
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('');
    const charIndex = initials.charCodeAt(0) - 65;
    const colorIndex = charIndex % 4;
    return {
      sx: {
        bgcolor: colors[colorIndex],
      },
      children: `${initials}`,
    };
  };


  // Follow & Unfollow
// const handleFollow = async (event) => {
//   // event.stopPropagation();
//   try {
//       const response = await axios.patch(`api/user/follow/${user._id}`,{ currentUser:  currentUser._id}, {
//           headers: {
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${token}`,
//           },
//       })
//       console.log('follow data =>',response.data);
//       dispatch(setUser({ user: response.data }))
//   } catch (err) {
//       console.log(err);
//   }
// }

// const handleUnfollow = async (event) => {
//   // event.stopPropagation();
//   try {
//       const response = await axios.patch(`api/user/unfollow/${user._id}`,{ currentUser:  currentUser._id}, {
//           headers: {
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${token}`,
//           },
//       })
//       console.log('unfollow data => ',response.data);
//       dispatch(setUser({ user: response.data }))
//   } catch (err) {
//       console.log(err);
//   }
// }


// useEffect(()=>{
//   if(currentUser.following.includes(user._id)){
//     setFollowing('following')
//   }
// },[following])

// const toggleFollow = (event)=>{
//   event.stopPropagation();
//   if(following=='follow'){
//     handleFollow();
//     setFollowing('following')
//   }else{
//     handleUnfollow();
//     setFollowing('follow')
//   }
// }



  return (
    <div className="UserRowMain">
      <div className='userRow m-3 shadow-lg rounded p-2' onClick={()=>handleUserClick(user._id)}>
          <div className="left">
            {
              user?.profilePicture !='' ?
              <img style={{borderRadius:'50%'}} src={user?.profilePicture} alt="" />
              :
              <Avatar {...stringAvatar(`${user?.name}`)} />
            }
              <div className="nameUsername">
                  <h4 className='m-0 ps-2'> {user.name}</h4>
                  <span className=' ps-2'> @{user.username}</span>
              </div>
          </div>
          <div className="right">
            {/* <button id='followBtn' className='btn btn-outline-primary' onClick={toggleFollow} >{following}</button> */}
            <button id='followBtn' className='btn btn-outline-primary' > view</button>
            {/* {
                currentUser &&   currentUser.following.includes(user._id) ? (
                <button id='followBtn' className='btn btn-outline-primary' onClick={handleUnfollow} >{following}</button>
                ) : (
                <button id='followBtn' className='btn btn-outline-primary' onClick={handleFollow} >follow</button>
              )
            } */}
          </div>
      </div>
    </div>
  )
}
 
export default React.memo(UserRow)