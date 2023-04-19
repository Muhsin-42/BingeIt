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
import ChatPage from '../pages/ChatPage/ChatPage';
import PageNotFound from '../pages/pageNotFound/PageNotFound';
import SingleMovie from '../pages/singleMovie/SingleMovie';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import EmailVerify from '../component/emailVerify/EmailVerify';
import ProtectedLayout from './ProtectedLayout';
import UnProtectedLayout from './UnProtectedLayout';

// const Profile = lazy(() => import('../pages/profile/Profile'));
import Profile from '../pages/profile/Profile';
import Notification from '../pages/notification/Notification';





const Layout = ()=>{          // Layout is the basic layout of an webpage // in this website there is like Navbar, LeftBar, and RightBar        // and these are common in all the pages hence we can make it a template.
  return (
    <div>
       <NavBar></NavBar>          
       <div className="d-flex">
          <LeftBar/>
          <div className="home-container">
            <Outlet />         {/* here is where the customized content gets rendered */}    
          </div>
          {/* <RightBar/> */}
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
          path: '/chat',
          element: <ChatPage/>
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