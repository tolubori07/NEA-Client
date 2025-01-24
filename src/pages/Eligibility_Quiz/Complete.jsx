import { lazy } from "react";

const Header = lazy(() => import("../../components/DonorHeader"));
const Complete = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default Complete;
