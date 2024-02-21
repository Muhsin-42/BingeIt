import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// Components
import Home from "../pages/home/Home";

import { EmailVerify, LeftBar, NavBar } from "../component";
import ProtectedLayout from "./ProtectedLayout";
import UnProtectedLayout from "./UnProtectedLayout";
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const Discover = lazy(() => import("../pages/discover/Discover"));
const Trending = lazy(() => import("../pages/trending/Trending"));
const Watchlist = lazy(() => import("../pages/watchlist/Watchlist"));
const LanguageMovies = lazy(
  () => import("../pages/languageMovies/LanguageMovies")
);
const Circle = lazy(() => import("../pages/circle/Circle"));
const PageNotFound = lazy(() => import("../pages/pageNotFound/PageNotFound"));
const SingleMovie = lazy(() => import("../pages/singleMovie/SingleMovie"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Notification = lazy(() => import("../pages/notification/Notification"));
const CommunityChat = lazy(() => import("../pages/Community/CommunityChat"));
const Layout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="d-flex">
        <LeftBar />
        <div className="home-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const routes = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <Layout />{" "}
        {/* // the Layout will be rendered normally but the OUTLET will check into the children to find the matching route. */}
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/discover",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Discover />
          </Suspense>
        ),
      },
      {
        path: "/trending",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Trending />
          </Suspense>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Watchlist />
          </Suspense>
        ),
      },
      {
        path: "/language/:language",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageMovies />
          </Suspense>
        ),
      },
      {
        path: "/notification",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Notification />
          </Suspense>
        ),
      },
      {
        path: "/circle",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Circle />
          </Suspense>
        ),
      },
      {
        path: "/community",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CommunityChat />
          </Suspense>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/movie/:movieName/:movieId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleMovie />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UnProtectedLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </UnProtectedLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <UnProtectedLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Register />
        </Suspense>
      </UnProtectedLayout>
    ),
  },
  {
    path: "/users/:id/verify/:token",
    element: <EmailVerify />,
  },
];

export default routes;
