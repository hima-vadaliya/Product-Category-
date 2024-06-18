// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function ProtectedRoutes({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token || !isValidToken(token)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// function isValidToken(token) {

//   return true;
// }

// export default ProtectedRoutes;

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const Protected = localStorage.getItem("token");
  return Protected ? children : <Navigate to={"/login"}></Navigate>;
}

export default ProtectedRoutes;

export function PrivateRoutes({ children }) {
  const Protected = localStorage.getItem("token");
  return Protected ? <Navigate to={"/dashboard"} /> : children;
}


