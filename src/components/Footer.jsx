import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-main border-t-2 border-border text-text font-base px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h2 className="text-xl font-display mb-4">
            About One Health Lifesavers
          </h2>
          <p>
            We continue to strive to improve the blood donation culture and
            access to primary healthcare. Our mission is to foster voluntary
            blood donations and address blood shortage through outreach and
            awareness.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-display mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-3">
            <li>
              <Button asChild className="w-fit">
                <a href="/dsignup">Become a Donor</a>
              </Button>
            </li>
            <li>
              <Button asChild className="w-fit">
                <Link to="/vsignup">Become a Volunteer</Link>
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-display mb-4">Connect with Us</h2>
          <ul className="flex flex-wrap gap-4">
            <li>
              <a
                href="https://instagram.com/onehealthls?igshid=OGQ5ZDc2ODk2ZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-border rounded-base px-4 py-2 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all"
              >
                <Instagram className="h-5 w-5" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100094508710417&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-border rounded-base px-4 py-2 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all"
              >
                <Facebook className="h-5 w-5" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/onehealthlfs?s=11&t=90iGkCUOVi3XBgT_S9Qcqw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-border rounded-base px-4 py-2 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all"
              >
                <Twitter className="h-5 w-5" /> Twitter
              </a>
            </li>
            <li>
              <a
                href="mailto:onehealthlifesavers@gmail.com"
                className="flex items-center gap-2 border-2 border-border rounded-base px-4 py-2 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all"
              >
                <Mail className="h-5 w-5" /> Gmail
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-sm">
        &copy; {new Date().getFullYear()} One Health Lifesavers. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
