import { Link } from "react-router-dom";
import logo from "/logo.png";
import { LogIn } from "lucide-react";

function Header() {
  return (
    <header className="w-full flex items-center justify-between p-4 px-20  ">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center relative">
          <img
            src={logo}
            alt="Filipino Job Board Logo"
            className="h-14 w-auto translate-y-1"
          />
          <span className="text-4xl font-bold text-gray-800 tracking-wide">
            SIKLAB
          </span>
        </Link>
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-600 hover:text-blue-500">
            Jobs
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500">
            About
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login">
          Sign In
          <LogIn className="inline-block ml-1" size={18} />
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-3xl"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Header;
