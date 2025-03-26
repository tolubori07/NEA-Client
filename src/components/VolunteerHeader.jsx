import { Calendar, Megaphone, Menu, PersonStandingIcon, X } from "lucide-react";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dropdown = lazy(() => import("./Dropdown"));

const VolunteerHeader = () => {
  const { user } = useAuth();
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
  ];

  return (
    <header className="bg-white h-24 border-b-4 border-b-black flex justify-between items-center px-8 mb-3">
      <Link to={user ? "/volunteer/dashboard" : "/"}>
        <img
          src="/logo.png"
          alt="Volunteer Logo"
          className="aspect-square min-h-18 max-h-24 min-w-18 max-w-24 cursor-pointer"
        />
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-12">
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
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-end transform transition-transform border-black border-border border-l-2">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <X
              onClick={toggleMobileMenu}
              className="h-8 w-8 cursor-pointer mb-6"
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-3 text-lg py-2 hover:bg-gray-100 rounded"
                onClick={toggleMobileMenu}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default VolunteerHeader;
