import { useEffect, useState } from "react";
import api from "../utils/api";
import formatCurrency from "../utils/formatCurrency";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api("/orders/admin/all");
        setOrders(data);
      } catch (error) {
        console.error("Admin orders fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const data = await api(`/orders/admin/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? data.order : order)),
      );
    } catch (error) {
      console.error("Status update failed:", error.message);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading orders...</p>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-6 sm:p-8">
      {/* Header */}
      <div className="border-b border-[#E8E6DD] pb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7C8576]">
          Store Management
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#293E30]">
          Admin Orders
        </h1>
        <p className="mt-2 text-sm text-[#777A70]">
          Track and review customer orders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#777A70]">Total Orders</p>
          <p className="mt-2 text-2xl font-semibold text-[#293E30]">
            {orders.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#777A70]">Delivered</p>
          <p className="mt-2 text-2xl font-semibold text-[#36563B]">
            {orders.filter((o) => o.status === "Delivered").length}
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#777A70]">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-[#85683A]">
            {
              orders.filter(
                (order) => (order.status || "Pending") === "Pending",
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E5DC] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#777A70]">Total Revenue</p>
          <p className="mt-2 text-2xl font-semibold text-[#293E30]">
            {formatCurrency(
              orders
                .filter((order) => order.status !== "Cancelled")
                .reduce((sum, order) => sum + (order.total || 0), 0),
            )}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-[#E7E5DC] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F5F5F0] text-xs uppercase tracking-wider text-[#777A70]">
              <tr>
                <th className="px-5 py-4 font-semibold">Order ID</th>
                <th className="px-5 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Items</th>
                <th className="px-5 py-4 font-semibold">Total</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DC]">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-sm text-[#777A70]"
                  >
                    No orders have been placed yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const status = order.status || "Pending";

                  return (
                    <tr key={order.orderId} className="hover:bg-[#F8F8F3]">
                      <td className="px-5 py-4 font-semibold text-[#293E30]">
                        {order.orderId}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-[#292D28]">
                          {order.details?.name}
                        </p>
                        <p className="mt-1 text-xs text-[#777A70]">
                          {order.details?.email}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-[#62685D]">
                        {order.items?.length}
                      </td>
                      <td className="px-5 py-4 font-medium text-[#293E30]">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="rounded-lg border border-[#E7E5DC] bg-white px-3 py-2 text-xs font-semibold text-[#293E30] outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
