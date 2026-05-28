import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "/logo.png";
import { LogIn } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import Dropdown from "../Dropdown";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated } = useAuth();
  const { user } = useUser();

  return (
    <header className="w-full flex items-center justify-between p-4 px-20 text-text">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center relative">
          <img
            src={logo}
            alt="Filipino Job Board Logo"
            className="h-14 w-auto translate-y-1"
          />
          <span className="text-4xl font-bold tracking-wide">SIKLAB</span>
        </Link>
        <nav className="flex space-x-4">
          <Link to="/" className="transition-colors hover:text-primary-hover">
            Home
          </Link>
          <Link
            to="/jobs"
            className="transition-colors hover:text-primary-hover"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="transition-colors hover:text-primary-hover"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 relative">
        {isAuthenticated ? (
          <>
            <div
              className="flex items-center gap-4 cursor-pointer hover:bg-primary-hover transition-colors px-4 py-2 rounded-2xl"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <h1>{user?.fullName}</h1>
              <img
                src="/default-avatar.png"
                alt="Default Avatar"
                className="h-6 w-6 rounded-full"
              />
            </div>
            {isMenuOpen && <Dropdown setIsMenuOpen={setIsMenuOpen} />}
          </>
        ) : (
          <>
            <Link to="/login">
              Sign In
              <LogIn className="inline-block ml-1" size={18} />
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary  hover:bg-primary-hover transition-colors rounded-3xl"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
