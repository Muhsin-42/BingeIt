import React from 'react'

function InfoBar({friend}) {

  const toggleInfoBar = (type) =>{

  }


  let followerCount =0;
  async function set(){
    if(friend){
       followerCount = await friend.followers.length 
    }
  }
  return (
    <div className="infoBar  mt-4 row ">
        <div className="card-1 col col-12 col-lg-3 col-md-12 col-sm-12" style={{pointerEvents: 'none'}}>Movies <br />256</div>
        <div className="card-2 col col-6 col-lg-2 col-md-6 col-sm-6" onClick={toggleInfoBar('followers')} >Followers<br />{Object.keys(friend).length ? friend.followers.length : '0'}</div>
        <div className="card-3 col col-6 col-lg-2 col-md-6 col-sm-6">Following<br />{Object.keys(friend).length ? friend.following.length : '0'}</div>
        <div className="card-4 col col-6 col-lg-3 col-md-6 col-sm-6">Watch Hours<br />23hr 45mins</div>
        <div className="card-5 col col-6 col-lg-2 col-md-6 col-sm-6">Sats</div>
    </div>
  )
}

export default React.memo(InfoBar);