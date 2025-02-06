import React, { lazy } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../api/Authcontext";

const Header = lazy(() => import("../components/DonorHeader"));

const Welcome = () => {
  const { user } = useAuth(AuthContext);
  return (
    <div>
      <Header />
      Welcome
    </div>
  );
};

export default Welcome;
