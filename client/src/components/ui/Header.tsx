import { Link } from "react-router-dom";
import logo from "/logo.png";
import { LogIn } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

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

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to="/profile">{user?.fullName || user?.email}</Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-3 py-1 bg-gray-200 text-sm rounded"
            >
              Logout
            </button>
          </div>
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
