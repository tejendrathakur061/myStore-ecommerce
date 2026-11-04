import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#292D28] ">
      <Navbar />
      <main className="px-4 pb-6 pt-32 sm:px-6 sm:pt-24 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;