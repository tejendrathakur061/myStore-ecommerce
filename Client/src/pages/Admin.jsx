import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const adminNavLinkClass = ({ isActive }) =>
  `block shrink-0 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-[#293E30] text-white shadow-sm"
      : "text-[#62675E] hover:bg-[#F0F0E8] hover:text-[#293E30]"
  }`;

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#292D28] md:flex">
      <aside className="border-b border-[#E6E5DC] bg-[#FCFCF8] p-4 md:fixed md:inset-y-0 md:left-0 md:flex md:h-screen md:w-64 md:flex-col md:border-r md:p-5">
        <h2 className="mb-4 border-b border-[#E9E8DF] px-2 pb-4 text-xl font-semibold tracking-tight text-[#293E30] md:mb-8 md:pb-5">
          Admin Panel
        </h2>

        <nav className="flex gap-2 overflow-x-auto pb-1 md:block md:space-y-1.5 md:overflow-visible md:pb-0">
          <NavLink to="dashboard" className={adminNavLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="products" className={adminNavLinkClass}>
            Products
          </NavLink>

          <NavLink to="users" className={adminNavLinkClass}>
            Users
          </NavLink>

          <NavLink to="orders" className={adminNavLinkClass}>
            Orders
          </NavLink>
        </nav>

        <div className="mt-4 md:mt-auto md:pt-8">
          <NavLink
            to="/login"
            onClick={handleSignOut}
            className="block w-full rounded-lg bg-[#293E30] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3A5140]"
          >
            Sign Out
          </NavLink>
        </div>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 md:ml-64 md:flex-1 md:p-7 lg:p-9">
        <div className="mx-auto w-full max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Admin;
