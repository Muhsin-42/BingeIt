import React , { lazy, Suspense } from 'react';
import {  Outlet } from "react-router-dom";

// Components
import NavBar from '../component/navBar/NavBar'
import LeftBar from '../component/leftBar/LeftBar'
import Home from '../pages/home/Home';
import Discover from '../pages/discover/Discover';
import Trending from '../pages/trending/Trending';
import Watchlist from '../pages/watchlist/Watchlist';
import LanguageMovies from '../pages/languageMovies/LanguageMovies';
import Circle from '../pages/circle/Circle';
import PageNotFound from '../pages/pageNotFound/PageNotFound';
import SingleMovie from '../pages/singleMovie/SingleMovie';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import EmailVerify from '../component/emailVerify/EmailVerify';
import ProtectedLayout from './ProtectedLayout';
import UnProtectedLayout from './UnProtectedLayout';
import Profile from '../pages/profile/Profile';
import Notification from '../pages/notification/Notification';
import CommunityChat from '../pages/Community/CommunityChat';


const Layout = ()=>{          
  return (
    <div>
       <NavBar></NavBar>          
       <div className="d-flex">
          <LeftBar/>
          <div className="home-container">
            <Outlet />            
          </div>
       </div>
    </div>
  )
}


const routes = [
    {
      path: "*",
      element : <PageNotFound/>
    },
    {
      path: "/",
      element: 
          <ProtectedLayout>
            <Layout/>   {/* // the Layout will be rendered normally but the OUTLET will check into the children to find the matching route. */}
          </ProtectedLayout>,
      children:[
        {
          path: '/',
          element:  <Home/>  
        },
        {
          path : '/home',
          element: <Home/>
        },
        {
          path : '/discover',
          element: <Discover/>
        },
        {
          path: '/trending',
          element: <Trending/>
        },
        {
          path: '/watchlist',
          element: <Watchlist/>
        },
        {
          path: '/language/:language',
          element: <LanguageMovies/>
        },
        {
          path: '/notification',
          element: <Notification/>
        },
        {
          path: '/circle',
          element: <Circle/>
        },
        {
          path: '/community',
          element: <CommunityChat/>
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
        {
          path: '/movie/:movieName/:movieId',
          element: <SingleMovie></SingleMovie>
        }
      ]
    },
    {
      path: "/login",
      element:  
        <UnProtectedLayout>
          <Login />
        </UnProtectedLayout>
    },
    {
      path: "/register",
      element: 
      <UnProtectedLayout>
        <Register/>
      </UnProtectedLayout>
    },
    {
      path: '/users/:id/verify/:token',
      element : <EmailVerify/>
    }
];


  export default routes;