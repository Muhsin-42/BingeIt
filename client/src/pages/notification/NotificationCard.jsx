import React from 'react'
import placeHolderImage from '../../assets/images/user-placeholder.jpg'
import './notificationCard.scss'
import { Link } from 'react-router-dom'
import ta from 'time-ago' 
function NotificationCard({notification}) {
  return (
    <div className='notificationCard bg-white'>
        {
            notification.fromSocket ? (
                <>
                    <div className="left">
                        {
                            notification?.senderProfile !=='' ?
                            <Link className='link'  to={`/profile/${notification?.senderId}`}>
                                <img src={notification?.senderProfile} alt="" />
                            </Link>
                            : <img src={placeHolderImage} alt="" />
                        
                        }
                    </div>
                    <div className="right">
                        <div className="set1"> 
                            <div className='level1'> 
                                <span className='text-bold fs-3' > <Link className='link'  to={`/profile/${notification?.senderId}`}> {notification?.senderName} </Link></span> 
                                <span className='px-2'>@{notification?.senderUsername}</span>
                            </div> 
                            
                                {
                                    notification?.type==='follow' && <span className='level2'> started following you   </span>
                                }
                                {
                                    notification?.type==='replied' && <span className='level2'> 
                                            replied on your review on  
                                            <Link className='text-white text-bold' style={{textDecoration: 'none'}} to={`/movie/${notification.movieTitle}/${notification.movieId}`}>  
                                                {' '+notification?.movieTitle} 
                                            </Link>
                                    </span>
                                }
                                {
                                    notification?.type ==='postLiked' &&
                                    <span className='level2' 
                                        style={{
                                            display:'flex',
                                            justifyContent: 'space-between'
                                        }}> 
                                        Liked your post   
                                        <>
                                        {
                                            notification.image !='' && 
                                        <img src={notification.image} height={'50px'} width={'50px'} alt="" />
                                        }
                                        </>
                                    </span>
                                }
                        </div>
                        <div className="set2">{ta.ago( notification?.createdAt)}</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="left">
                        {
                            notification?.notificationBy?.profilePicture !=='' ?
                            <Link className='link'  to={`/profile/${notification?.notificationBy._id}`}>
                                <img src={notification?.notificationBy?.profilePicture} alt="" />
                            </Link>
                            : <img src={placeHolderImage} alt="" />
                        
                        }
                    </div>
                    <div className="right">
                    <div className="set1"> 
                        <div className='level1'> 
                            <span className='text-bold fs-3' > <Link className='link'  to={`/profile/${notification?.notificationBy._id}`}> {notification?.notificationBy?.name} </Link></span> 
                        </div> 
                        
                            {
                                notification?.type==='follow' && <span className='level2'><span className='px-2'>@{notification?.notificationBy?.username}</span> started following you   </span>
                            }
                            {
                                notification?.type==='replied' && <span className='level2'> 
                                        replied on your review on  
                                            <Link className='text-white text-bold' style={{textDecoration: 'none'}} to={`/movie/${notification.movieTitle}/${notification.movieId}`}>  
                                                {' '+notification?.movieTitle} 
                                            </Link>
                                        </span>
                            }
                            {
                                notification?.type==='postLiked' && 
                                        <span className='level2' 
                                            style={{
                                                display:'flex',
                                                justifyContent: 'space-between'
                                            }}
                                            > 
                                            @{notification?.notificationBy?.username} Liked you post   
                                            {
                                                notification.postId.image != '' && 
                                                <img src={notification.postId.image} height={'50px'} width={'50px'} alt="" />
                                            }
                                        </span>
                            }
                    </div>
                    <div className="set2">{ta.ago( notification?.createdAt)}</div>
                    </div>
                </>
            ) 
        }
       
    </div>
  )
}

export default NotificationCard