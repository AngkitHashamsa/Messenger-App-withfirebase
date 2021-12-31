import React from "react";

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let token = localStorage.getItem("Auth Token");
  return token ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
