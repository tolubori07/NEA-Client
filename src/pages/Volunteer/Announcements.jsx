import { lazy } from "react";

const Header = lazy(() => import("../../components/VolunteerHeader"));
const Announcements = () => {
  return (
    <div>
      <Header />
      Announcements
    </div>
  );
};

export default Announcements;
