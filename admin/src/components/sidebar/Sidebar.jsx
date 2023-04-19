import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FlagIcon from '@mui/icons-material/Flag';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/Reviews';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {useDispatch} from 'react-redux';
import { setLogout } from "../../Redux/store";

const Sidebar = () => {
 
  const { dispatch } = useContext(DarkModeContext);
  const disPatch = useDispatch()
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo text-success">BINGE ADMIN </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
          {/* <p className="title">MAIN</p> */}
          <li>
            <FingerprintIcon className="icon text-success" />
            <span>Dashboard</span>
          </li>
          </Link>
          {/* <p className="title">LISTS</p> */}
          <Link to="/users-list" style={{ textDecoration: "none" }}>
          <br/>
            <li>
              <PeopleIcon className="icon text-success" />
              <span>Users</span>
            </li>
          </Link>
          <br/>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon text-success" />
              <span>Posts</span>
            </li>
          </Link>
          <br/>
          <Link to="/reviews" style={{ textDecoration: "none" }}>
          <li>
            <ReviewsIcon className="icon text-success" />
            <span>Reviews</span>
          </li>
          </Link>
          <br/>
         <Link style={{ textDecoration: "none" }} to='/reports'>
         <li>
            <FlagIcon className="icon text-success" />
            <span>Reports</span>
          </li>
         </Link>
          <br />
          <li>
            <ExitToAppIcon className="icon  text-success"  />
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="" onClick={()=>disPatch(setLogout())}> <span>Logout</span></div>
            </Link>
          </li>
        </ul>
      </div>
      <br/>

    </div>
  );
};

export default Sidebar;
