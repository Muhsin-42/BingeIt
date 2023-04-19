import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import { setAllUsers, setPosts, setReports,setReviews } from "../../Redux/store";
import axios from '../../utils/axios'

const Home = () => {

  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.allUsers);
  const token = useSelector(state=>state.token)

  const posts = useSelector(state => state.posts);

  const getAllPosts = () => {
    axios.get('api/post/posts',{
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch(setPosts({ posts: response.data }))
      })
      .catch((error) => {
        console.log("inside catch");
        console.log(error);
      });
  };
  const getAllReviews = () => {
    axios.get('api/admin/getAllReviews',{
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch(setReviews({ reviews: response.data }))
      })
      .catch((error) => {
        console.log("inside catch");
        console.log(error);
      });
  };

  const getAllReports = () => {
    axios.get('api/admin/getAllReports',{
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch(setReports({ reports: response.data }))
      })
      .catch((error) => {
        console.log("inside catch");
        console.log(error);
      });
  };
 

  useEffect(()=>{
    getAllPosts();
    getAllReports();
    getAllReviews();
  },[]);

  const navigateToUsers = () =>{
    console.log('djdjdjd')
    alert('hurray ')
  }
    return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users"/>
          <Widget type="posts" />
          <Widget type="reviews" />
          <Widget type="reports" />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">All The users</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
