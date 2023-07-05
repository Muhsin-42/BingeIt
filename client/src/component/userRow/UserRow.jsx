import React from 'react';
import './userRow.scss';
import Avatar from '@mui/material/Avatar';
import { blue, green, pink, yellow } from '@mui/material/colors';

function UserRow({ user, handleUserClick }) {
  const stringAvatar = (name) => {
    const colors = [pink[400], blue[400], green[400], yellow[400]];
    const initials = name.split(' ').map((word) => word[0]).join('');
    const charIndex = initials.charCodeAt(0) - 65;
    const colorIndex = charIndex % 4;
    return {
      sx: {
        bgcolor: colors[colorIndex],
      },
      children: `${initials}`,
    };
  };

  return (
    <div className="UserRowMain">
      <div className='userRow m-3 shadow-lg rounded p-2' onClick={() => handleUserClick(user._id)}>
        <div className="left">
          {user?.profilePicture !== '' ? (
            <img style={{ borderRadius: '50%' }} src={user?.profilePicture} alt="" />
          ) : (
            <Avatar {...stringAvatar(`${user?.name}`)} />
          )}
          <div className="nameUsername">
            <h4 className='m-0 ps-2'> {user.name}</h4>
            <span className=' ps-2'> @{user.username}</span>
          </div>
        </div>
        <div className="right">
          <button id='followBtn' className='btn btn-outline-primary'>view</button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserRow);