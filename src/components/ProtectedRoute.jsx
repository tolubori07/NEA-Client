// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../api/Authcontext";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user === undefined) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/dlogin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
