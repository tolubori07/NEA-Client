import { Calendar, LogIn, Map, Menu } from "lucide-react";
import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../api/Authcontext";

const Button = lazy(() => import("./Button"));
const Dropdown = lazy(() => import("./Dropdown"));

const DonorHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth(AuthContext);
  const items = [
    {
      label: "Eligibility Quiz",
      onClick: "",
      ariaLabel: "Click to navigate to Eligibility Quiz",
      href: "/quiz",
    },
  ];

  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex flex-row justify-between items-center mb-3 gap-[20rem]">
      <Link to={user ? "/donor/dashboard" : "/"}>
        <img
          src="/logo.png"
          alt=""
          className="aspect-square ml-8 min-h-18 max-h-24  cursor-pointer"
        />
      </Link>

      <div className="navlinks flex gap-[6rem] mr-3 ">
        <Menu className="h-10 w-10 xl:hidden lg:hidden sm:inline md:inlind bg-main shadow-dark rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none border-border border-2" />
      </div>
    </header>
  );
};

export default DonorHeader;
