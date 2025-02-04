import React, { lazy } from "react";

const Header = lazy(() => import("../components/DonorHeader"));

const Welcome = () => {
  return (
    <div>
      <Header />
      Welcome
    </div>
  );
};

export default Welcome;
