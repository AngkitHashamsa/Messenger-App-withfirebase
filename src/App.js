import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Rejister from "./Pages/Rejister";
import Navbar from "./Component/Navbar/Navbar";
import Error from "./Pages/Error";
import { useEffect } from "react";
import Profile from "./Pages/Profile";
import PrivateRoute from "./PrivateRoute";
function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   let token = localStorage.getItem("Auth Token");
  //   if (token) {
  //     navigate("/");
  //   }
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Rejister />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
