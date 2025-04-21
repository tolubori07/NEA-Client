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
        <Dropdown items={items} label="Guidance" icon={HelpCircle} />
        <Link to={"/dlogin"}>
          <Button className={"font-display text-xl"}>Donor Login</Button>
        </Link>
        <Link to={"/vlogin"}>
          <Button className={"font-display text-xl"}>Volunteer Login</Button>
        </Link>
      </div>

      <Button
        onClick={toggleMobileMenu}
        className="md:hidden text-black"
        aria-label="Open mobile menu"
      >
        <Menu size={32} />
      </Button>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleMobileMenu}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              aria-label={item.ariaLabel}
              className="flex items-center gap-2 text-lg text-black font-medium"
              onClick={toggleMobileMenu}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}

          {!isAuthenticated && (
            <Link to="/dlogin" className="mt-4">
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
