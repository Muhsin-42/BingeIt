import { useEffect } from "react";
import "./App.css";
import routes from "./routes/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socket.io/socket.io";
import { setLogout } from "./Redux/store";

function App() {
  const dispatch = useDispatch();
  const currentUserRedux = useSelector((state) => state.user);

  // Socket.io
  useEffect(() => {
    socket.emit("newUser", currentUserRedux?._id);
  }, [currentUserRedux]);

  // Routers
  const router = createBrowserRouter(routes);

  useEffect(() => {
    socket.on("getBlocked", () => {
      dispatch(setLogout());
    });
  }, []);

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
