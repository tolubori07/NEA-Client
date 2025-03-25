import { Calendar, LogIn, Map, Menu } from "lucide-react";
import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Button = lazy(() => import("./Button"));
const Dropdown = lazy(() => import("./Dropdown"));

const DonorHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated} = useAuth();
  
  const items = [
    {
      label: "Eligibility Quiz",
      onClick: () => navigate("/quiz"),
      ariaLabel: "Click to navigate to Eligibility Quiz",
      href: "/quiz",
    },
  ];

  const appointments = [
    {
      label: "Book an appointment",
      onClick: () => navigate("/donor/bookappointment"),
      ariaLabel: "Click to navigate to the appointment booking",
      href: "/donor/bookappointment",
    },
    {
      label: "My appointments",
      onClick: () => navigate("/donor/appointments"),
      ariaLabel: "Click to navigate to view all your appointments",
      href: "/donor/appointments",
    },
  ];

  const profiles = [
    {
      label: "Your Dashboard",
      onClick: () => navigate("/donor/dashboard"),
      ariaLabel: "Click to navigate to your donor dashboard",
      href: "/donor/dashboard",
    },
    {
      label: "About you",
      onClick: () => navigate("/donor/profile"),
      ariaLabel: "Click to navigate to your donor profile",
      href: "/donor/profile",
    },
  ];

  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex flex-row justify-between items-center mb-3 gap-[20rem]">
      <Link to={isAuthenticated ? "/donor/dashboard" : "/"}>
        <img
          src="/logo.png"
          alt="Logo"
          className="aspect-square ml-8 min-h-18 max-h-24 cursor-pointer"
        />
      </Link>

      {isAuthenticated && (
        <div className="navlinks flex gap-[6rem] mr-3">
          <Link to={"/dlogin"}>
            <Button
              className={`${isAuthenticated ? "hidden" : ""} text-text font-display font-bold text-xl sm:hidden lg:inline-flex xl:inline-flex md:hidden`}
            >
              Login
              <LogIn />
            </Button>
          </Link>
        </div>
      )}

      <Dropdown
        items={profiles}
        label="Profile"
        icon={Map}
        className="sm:hidden lg:inline xl:inline md:hidden"
      />

      <Dropdown
        items={items}
        label="Guidance"
        icon={Map}
        className="lg:inline xl:inline md:hidden sm:hidden"
      />
      
      <Dropdown
        items={appointments}
        label="Appointments"
        icon={Calendar}
        className={`${isAuthenticated ? "" : "hidden "} sm:hidden lg:inline xl:inline md:hidden`}
      />

      <Menu className="h-10 w-10 xl:hidden lg:hidden sm:inline md:inline bg-main shadow-dark rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none border-border border-2" />
    </header>
  );
};

export default DonorHeader;

