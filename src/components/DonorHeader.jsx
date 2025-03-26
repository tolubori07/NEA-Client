import { Calendar, LogIn, User, HelpCircle, Menu } from "lucide-react";
import { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Button = lazy(() => import("./Button"));
const Dropdown = lazy(() => import("./Dropdown"));

const DonorHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const items = [
    {
      label: "Eligibility Quiz",
      href: "/quiz",
      ariaLabel: "Click to navigate to Eligibility Quiz",
      icon: HelpCircle,
    },
  ];

  const appointments = [
    {
      label: "Book an appointment",
      href: "/donor/bookappointment",
      ariaLabel: "Click to navigate to the appointment booking",
      icon: Calendar,
    },
    {
      label: "My appointments",
      href: "/donor/appointments",
      ariaLabel: "Click to navigate to view all your appointments",
      icon: Calendar,
    },
  ];

  const profiles = [
    {
      label: "Your Dashboard",
      href: "/donor/dashboard",
      ariaLabel: "Click to navigate to your donor dashboard",
      icon: User,
    },
    {
      label: "About you",
      href: "/donor/profile",
      ariaLabel: "Click to navigate to your donor profile",
      icon: User,
    },
  ];

  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex justify-between items-center mb-3 px-8">
      <Link to={isAuthenticated ? "/donor/dashboard" : "/"}>
        <img
          src="/logo.png"
          alt="Logo"
          className="aspect-square min-h-18 max-h-24 cursor-pointer"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-12">
        <Dropdown items={profiles} label="Profile" icon={User} />
        <Dropdown items={items} label="Guidance" icon={HelpCircle} />
        {isAuthenticated && (
          <Dropdown items={appointments} label="Appointments" icon={Calendar} />
        )}
      </div>

      {!isAuthenticated && (
        <Link to="/dlogin">
          <Button className="text-text font-display font-bold text-xl hidden md:inline-flex">
            Login
            <LogIn />
          </Button>
        </Link>
      )}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleMobileMenu}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col p-4 space-y-6">
          <Dropdown items={profiles} label="Profile" icon={User} />
          <Dropdown items={items} label="Guidance" icon={HelpCircle} />
          {isAuthenticated && (
            <Dropdown
              items={appointments}
              label="Appointments"
              icon={Calendar}
            />
          )}
          {!isAuthenticated && (
            <Link to="/dlogin" className="mt-auto">
              <Button className="w-full text-text font-display font-bold text-xl">
                Login
                <LogIn />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default DonorHeader;
