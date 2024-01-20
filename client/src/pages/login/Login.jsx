import "./login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { loginPost } from "../../utils/constants";
import { setUser, setToken } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [datas, setDatas] = useState({ email: "", password: "" });
  // const [error, setError] = useState("");
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();

  const notifyLoginError = (error) =>
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const handleChange = ({ currentTarget: input }) => {
    setDatas({ ...datas, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = loginPost;
      const { data } = await axios.post(url, datas);
      dispatch(setUser({ user: data.user }));
      dispatch(setToken({ token: data.token }));
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
        setLoginError(true);
        notifyLoginError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginCard">
        <div className="left">
          <h1>Binge!</h1>
          <p>
            {`Welcome to Binge! We're thrilled to have you here. Our website
            offers an extensive collection of the latest and greatest movies, as
            well as beloved classics that you won't find anywhere else.`}
          </p>
          <span>{`Don't have an account?`}</span>
          <Link to="/register">
            <button className="btn">Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              onChange={handleChange}
              value={datas.email}
              name="email"
              style={{ borderColor: `${loginError ? "red" : "none"}` }}
              required
            />
            <span className="emailError"></span>
            <input
              className="m-0"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={datas.password}
              minLength="3"
              name="password"
              style={{ borderColor: `${loginError ? "red" : "none"}` }}
              required
            />
            <button className="btn" type="submit">
              Login
            </button>
          </form>
          <span>
            {`Don't have an account?`}
            <Link to="/register">register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
