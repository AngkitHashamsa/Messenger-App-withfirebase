import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthProvider } from "./context/context";
function PrivateRoute({ children }) {
  let token = localStorage.getItem("Auth Token");

  return token ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
