import { LogIn, Map } from "lucide-react";
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
  const profiles = [
    {
      label: "Your Dashboard",
      onclick: "",
      ariaLabel: "Click to navigate to your donor dashboard",
      href: "/donor/dashboard",
    },
    {
      label: "About you",
      onclick: "",
      ariaLabel: "Click to navigate to your donor profile",
      href: "/donor/profile",
    },
  ];
  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex flex-row justify-between items-center mb-3 gap-[20rem]">
      <Link to={user ? "/donor/dashboard" : "/"}>
        <img src="/logo.png" alt="" className="w-24 ml-8 h-24 cursor-pointer" />
      </Link>

      <div className="navlinks flex gap-[6rem] mr-3">
        <Link to={"/dlogin"}>
          <Button
            className={`${user ? "hidden" : ""} text-text font-display font-bold text-xl`}
          >
            Login
            <LogIn />
          </Button>
        </Link>

        <Dropdown
          items={profiles}
          label="Profile"
          icon={Map}
          className="sm:hidden lg:inline xl:inline"
        />

        <Dropdown
          items={items}
          label="Guidance"
          icon={Map}
          className="sm:hidden lg:inline xl:inline"
        />
        <Link to={"/donor/bookappointment"}>
          <Button
            children={"Book an appointment"}
            className="text-text font-bold"
          />
        </Link>
      </div>
    </header>
  );
};

export default DonorHeader;
