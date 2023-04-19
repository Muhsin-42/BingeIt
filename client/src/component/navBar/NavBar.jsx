import React, { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import './navBar.scss'
import logo from './../../assets/images/logo.png'

function NavBar() {

  const [showNav,setNav] = useState(false);
  const [navStyle,setNavStyle] = useState({});
  
  useEffect(() => {
      if(showNav){
          setNavStyle({
            display:'block',
            transition: '0.5s'
          }) 
        }else{
          setNavStyle({
            transition: '0.5s',
          display: 'none'
        })
      }
  }, [showNav]);

  return (

    <div className="navBar bg-dark">
      <div className="container-fluid  d-flex justify-content-between align-items-center">
        <img src={logo} alt="" className='logo' />
        {
          !showNav && <i className="bi bi-list text-white"   onClick={()=>setNav(!showNav)}></i>
        }
        {
          showNav && <i className="bi bi-x-lg text-white"   onClick={()=>setNav(!showNav)}></i>
        }
      </div>

      <ul className='text-white ' style={navStyle}>
          <li>
            <i className="bi bi-house-door"></i>
            Home
          </li>
          <li>
            <i className="bi bi-bookmarks"></i>
            Watchlist
          </li>
          <li>
            <i className="bi bi-heart"></i>
            Favourite
          </li>
          <li>
            <i className="bi bi-fire"></i>
            Trending
          </li>
          <li>
            <i className="bi bi-bell"></i>
            Notifications
          </li>
        </ul>
    </div>
  )
} 

export default NavBar