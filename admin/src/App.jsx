import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Single from "./Pages/userList/Single";
import {  Routes, Route ,Navigate} from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import {useSelector} from 'react-redux';
import { DarkModeContext } from "./context/darkModeContext";
import 'react-toastify/dist/ReactToastify.css';
import PostsList from "./Pages/Posts/PostsList";
import ReviewsList from './Pages/Reviews/ReviewsList'
import Reports from './Pages/Reports/Reports'

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector(state=>state.token)
  console.log('token = >' ,token);
  if(token===null){
     
  }
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    <div className={darkMode ? "app dark" : "app"}>

        
        <Routes>
            
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/">
            <Route index element={token ? <Home />: <Navigate to="/login" />} />
            <Route path="/users-list" element={token? <Single /> : <Navigate to="/login"></Navigate> } />
            <Route path="/posts" element={token? <PostsList /> : <Navigate to="/login"></Navigate>} />
            <Route path="/reviews" element={token? <ReviewsList /> : <Navigate to="/login"></Navigate>} />
            <Route path="/reports" element={token? <Reports/> : <Navigate to="/login"></Navigate>} />
          </Route> 
        </Routes>
        
 
    </div>
  );
}

export default App;
