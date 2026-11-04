import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative flex h-full items-center px-3 py-2 text-sm font-semibold transition-colors duration-200 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:transition-colors after:content-[''] ${
      isActive
        ? "text-[#293E30] after:bg-[#293E30]"
        : "text-[#62685D] after:bg-transparent hover:text-[#293E30] hover:after:bg-[#293E30]"
    }`;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-start justify-between gap-3 border-b border-[#E7E5DC] bg-[#FCFCF8] px-4 py-3 text-[#292D28] sm:flex-row sm:items-center sm:px-8 sm:py-4"
    >
      <h1 className="flex items-center text-xl font-semibold tracking-tight text-[#293E30]">
        MyStore
      </h1>

      <div className="w-full overflow-x-auto sm:w-auto">
        <div className="flex w-max min-w-full items-stretch gap-1 sm:w-auto sm:gap-2">
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            Orders
          </NavLink>

          <NavLink to="/checkout" className={navLinkClass}>
            Checkout
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>

          <NavLink
            to="/login"
            onClick={handleSignOut}
            className="my-1 shrink-0 rounded-lg bg-[#293E30] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3A5140]"
          >
            Sign Out
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
