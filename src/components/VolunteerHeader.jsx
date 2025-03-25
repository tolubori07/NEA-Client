import {
  Calendar,
  Megaphone,
  Menu,
  PersonStandingIcon,
} from "lucide-react";
import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Button = lazy(() => import("./Button"));
const Dropdown = lazy(() => import("./Dropdown"));

const DonorHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const profiles = [
    {
      label: "Your Dashboard",
      onclick: "",
      ariaLabel: "Click to navigate to your donor dashboard",
      href: "/volunteer/dashboard",
    },
    {
      label: "About you",
      onclick: "",
      ariaLabel: "Click to navigate to your donor profile",
      href: "/volunteer/profile",
    },
  ];

  const events = [
    {
      label: "Book an event",
      onclick: "",
      ariaLabel: "Click to navigate to the event booking",
      href: "/volunteer/book",
    },
    {
      label: "My events",
      onclick: "",
      ariaLabel: "Click to navigate to view all your appointments",
      href: "/volunteer/events",
    },
  ];

  const comms = [
    {
      label: "Send a message",
      onclick: "",
      ariaLabel: "Click to navigate to send a message",
      href: "/volunteer/message",
    },
    {
      label: "Announcements",
      onclick: "",
      ariaLabel: "Click to navigate to send the announcements page",
      href: "/volunteer/announcements",
    },
  ];
  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex flex-row justify-between items-center mb-3 gap-[10rem]">
      <Link to={user ? "/volunteer/dashboard" : "/"}>
        <img
          src="/logo.png"
          alt=""
          className="aspect-square ml-8 min-h-18 max-h-24 min-w-18 max-w-24  cursor-pointer"
        />
      </Link>
      <Dropdown items={profiles} label={"Profiles"} icon={PersonStandingIcon} />
      <Dropdown items={events} label={"Events"} icon={Calendar} />
      <Dropdown items={comms} label={"Communications"} icon={Megaphone} />

      <div className="navlinks flex gap-[6rem] mr-3 ">
        <Menu className="h-10 w-10 xl:hidden lg:hidden sm:inline md:inlind bg-main shadow-dark rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none border-border border-2" />
      </div>
    </header>
  );
};

export default DonorHeader;
