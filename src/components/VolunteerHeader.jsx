import {
  Calendar,
  Megaphone,
  Menu,
  PersonStandingIcon,
  Shield,
} from "lucide-react";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dropdown = lazy(() => import("./Dropdown"));

const VolunteerHeader = () => {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navLinks = [
    {
      label: "Your Dashboard",
      href: "/volunteer/dashboard",
      icon: PersonStandingIcon,
    },
    {
      label: "About You",
      href: "/volunteer/profile",
      icon: PersonStandingIcon,
    },
    { label: "Book an Event", href: "/volunteer/book", icon: Calendar },
    { label: "My Events", href: "/volunteer/events", icon: Calendar },
    { label: "Send a Message", href: "/volunteer/message", icon: Megaphone },
    {
      label: "Announcements",
      href: "/volunteer/announcements",
      icon: Megaphone,
    },
    {
      label: "Create Announcements",
      href: "/volunteer/admin/announcements",
      icon: Shield,
    },
    {
      label: "Create Events",
      href: "/volunteer/admin/event",
      icon: Shield,
    },
  ];

  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex justify-between items-center px-8 mb-3">
      <Link to={"/"}>
        <img
          src="/logo.png"
          alt="Volunteer Logo"
          className="aspect-square min-h-18 max-h-24 min-w-18 max-w-24 cursor-pointer"
        />
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-12">
        {isAuthenticated ? (
          user?.admin == true ? (
            <Dropdown
              items={navLinks.slice(6, 8)}
              label={"Admin"}
              icon={Shield}
            />
          ) : null
        ) : null}
        <Dropdown
          items={navLinks.slice(0, 2)}
          label={"Profile"}
          icon={PersonStandingIcon}
        />
        <Dropdown
          items={navLinks.slice(2, 4)}
          label={"Events"}
          icon={Calendar}
        />
        <Dropdown
          items={navLinks.slice(4, 6)}
          label={"Communications"}
          icon={Megaphone}
        />
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Menu
          onClick={toggleMobileMenu}
          className="h-10 w-10 bg-main shadow-dark rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none border-border border-2 cursor-pointer"
        />
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleMobileMenu}
        >
          <Menu />
        </div>
      )}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {navLinks.map((item) => (
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
            <Link to="/vlogin" className="mt-4">
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

export default VolunteerHeader;
