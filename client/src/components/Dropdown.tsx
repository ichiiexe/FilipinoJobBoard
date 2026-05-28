import { User, Cog, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef } from "react";

type DropdownProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Component or helper function.
function Dropdown({ setIsMenuOpen }: DropdownProps) {
// Access authentication helpers.
  const { logout } = useAuth();
// React Router navigation hook.
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
// Component or helper function.
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <div
      className="absolute top-12 right-0 px-4 py-2 bg-card rounded-xl cursor-pointer min-w-60"
      ref={ref}
    >
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-1">
          <User className="inline-block mr-1" size={18} />
          <Link
            to="/profile"
            className="hover:text-primary-hover transition-colors"
          >
            Profile
          </Link>
        </li>
        <li className="flex items-center gap-1">
          <Cog className="inline-block mr-1" size={18} />
          <Link
            to="/settings"
            className="hover:text-primary-hover transition-colors"
          >
            Settings
          </Link>
        </li>

        <li className="flex items-center gap-1">
          <LogOut className="inline-block mr-1" size={18} />
          <Link
            to="/"
            className="hover:text-primary-hover transition-colors"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
