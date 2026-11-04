import { useEffect, useState } from "react";
import api from "../utils/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api("/admin/users");
        setUsers(
          data.map((user) => ({
            ...user,
            id: user._id,
          })),
        );
      } catch (error) {
        console.error("Users fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  if (loading) {
    return <p className="p-6 text-center">Loading users...</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-5 shadow-sm sm:p-7">
      <div className="mb-6 border-b border-[#E8E6DD] pb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7C8576]">
          Store Management
        </p>

        <h3 className="text-xl font-semibold tracking-tight text-[#293E30] sm:text-2xl">
          Users List
        </h3>

        <p className="mt-2 text-sm text-[#777A70]">
          Registered users and account information.
        </p>
      </div>

      {users.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#D6D8CE] bg-white px-5 py-10 text-center text-sm text-[#777A70]">
          No customer accounts have been registered yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E7E5DC]">
          <table className="w-full min-w-150 border-collapse text-left">
            <thead>
              <tr className="bg-[#F0F1E9]">
                <th className="border-b border-[#E3E4DA] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#626B5D]">
                  S.No
                </th>
                <th className="border-b border-[#E3E4DA] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#626B5D]">
                  Name
                </th>
                <th className="border-b border-[#E3E4DA] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#626B5D]">
                  Email
                </th>
                <th className="border-b border-[#E3E4DA] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#626B5D]">
                  ID
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EAE9E1]">
              {users.map((u, index) => (
                <tr key={u.id} className="transition-colors hover:bg-[#F7F7F1]">
                  <td className="px-5 py-4 text-sm text-[#777A70]">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-[#293E30]">
                    {u.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#62675E]">
                    {u.email}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[#777A70]">
                    {u.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
