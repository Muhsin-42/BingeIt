import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const Widget = ({ type }) => {
  const allUsers = useSelector(state => state.allUsers);
  const posts = useSelector(state => state.posts);
  const reports = useSelector(state => state.reports);
  const reviews = useSelector(state => state.reviews);
  const navigate = useNavigate();
  let data;

  //temporary
  const amount = allUsers? allUsers.length : 0;
  const totalUsers = allUsers? allUsers.length : 0;
  const totalPosts = posts? posts.length : 0;
  const totalReviews = reviews?reviews?.length:0;
  const totalReports = reports?reports?.length:0;
  const diff = 20;
  const handleCardClick = (route)=>{
    navigate(route);
  }

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        route:'/users-list',
        number : totalUsers,
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "posts":
      data = {
        title: "POSTS",
        route: '/posts',
        number: totalPosts,
        isMoney: false,
        link: "View all posts",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "reviews":
      data = {
        title: "REVIEWS",
        route: '/reviews',
        number: totalReviews,
        isMoney: false,
        link: "View all reviews",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "reports":
      data = {
        title: "REPORTS",
        route: '/reports',
        number: totalReports,
        isMoney: false,
        link: "view all reports",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget"  onClick={()=>handleCardClick(data.route)} >
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.number}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
