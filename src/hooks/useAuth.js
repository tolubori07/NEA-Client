// hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../api/Authcontext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    setUser,
    logout,
    isAuthenticated,
  };
};
