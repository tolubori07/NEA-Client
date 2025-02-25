import { lazy } from "react";

const Header = lazy(() => import("../../components/VolunteerHeader"));
const Dashboard = () => {
  return (
    <>
      <Header />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
