import formatCurrency from "../utils/formatCurrency";
import { useEffect, useState } from "react";
import api from "../utils/api";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api("/orders");
        setOrders(data);
      } catch (error) {
        console.error("Orders fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading orders...</p>;
  }
  const userOrders = orders;

  return (
    <div className="min-h-screen bg-[#F5F5F0] p-6 text-[#292D28] sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#293E30]">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-[#777A70]">
            Track your recent purchases and their status.
          </p>
        </div>

        {userOrders.length === 0 ? (
          <div className="rounded-xl border border-[#E7E5DC] bg-[#FCFCF8] p-8 text-center shadow-sm">
            <p className="text-lg font-medium text-[#777A70]">
              You haven’t placed an order yet.
            </p>
            <p className="mt-2 text-sm text-[#777A70]">
              Your purchases will appear here after checkout.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {userOrders.map((order) => (
              <li
                key={order.orderId}
                className="rounded-xl border border-[#E7E5DC] bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left side */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#777A70]">
                      Order ID
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#293E30]">
                      {order.orderId}
                    </p>
                    <p className="mt-3 text-base font-medium text-[#292D28]">
                      {order.details.name} — {order.details.address},{" "}
                      {order.details.city}
                    </p>
                    <ul className="mt-2 text-sm text-[#555] space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} × {item.qty} —{" "}
                          {formatCurrency(item.qty * item.price)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold bg-[#E8EEE5] text-[#36563B]">
                      Placed on {order.details.date}
                    </span>
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-[#E8EEE5] text-[#36563B]"
                          : "bg-[#F3EBDD] text-[#85683A]"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
