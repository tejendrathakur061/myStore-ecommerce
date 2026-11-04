import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useCart, { useCartActions } from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";
import api from "../utils/api";

const Checkout = () => {
  const { currentUser: user } = useAuth();
  const { getUserCart } = useCart();
  const { clearUserCart } = useCartActions();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  const items = user ? getUserCart(user.id) : [];
  const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (!form.address.trim()) newErrors.address = "Enter your street address.";
    if (!form.city.trim()) newErrors.city = "Enter your city.";
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setMessage({
        type: "error",
        text: "Please sign in before placing an order.",
      });
      return;
    }

    if (!items.length) {
      setMessage({
        type: "error",
        text: "Your cart is empty. Add a product before checking out.",
      });
      return;
    }

    if (!validateForm()) return;

    try {
      await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          details: {
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            pincode: form.pincode.trim(),
            date: new Date().toLocaleDateString(),
          },
        }),
      });

      clearUserCart();

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "COD",
      });

      setMessage({
        type: "success",
        text: "Your order was placed successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] p-4 text-[#292D28] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 border-b border-[#E1E1D7] pb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7C8576]">
            Complete Your Purchase
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-[#293E30] sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[#777A70]">
            Enter your delivery details and review your order.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left Side: Form */}
          <div className="space-y-6">
            {/* Address Form */}
            <section className="rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-5 shadow-sm sm:p-7">
              <div className="mb-6 border-b border-[#E8E6DD] pb-4">
                <h2 className="text-lg font-semibold text-[#293E30]">
                  Shipping Address
                </h2>
                <p className="mt-1 text-sm text-[#777A70]">
                  Provide the address for your delivery.
                </p>
              </div>

              <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["name", "phone", "email", "address", "city", "pincode"].map(
                  (field) => (
                    <div
                      key={field}
                      className={
                        field === "email" || field === "address"
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone"
                              ? "tel"
                              : "text"
                        }
                        inputMode={field === "pincode" ? "numeric" : undefined}
                        maxLength={field === "pincode" ? 6 : undefined}
                        name={field}
                        aria-label={
                          field === "address"
                            ? "Street address"
                            : field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={
                          field === "name"
                            ? "Full Name"
                            : field === "phone"
                              ? "Phone Number"
                              : field === "email"
                                ? "Email"
                                : field === "address"
                                  ? "Street Address"
                                  : field === "city"
                                    ? "City"
                                    : "Pincode"
                        }
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition 
                        ${errors[field] ? "border-red-500 focus:ring-red-200" : "border-[#DEDED4] focus:border-[#526B54] focus:ring-[#293E30]/10"}`}
                      />
                      {errors[field] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </form>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-5 shadow-sm sm:p-7">
              <div className="mb-5 border-b border-[#E8E6DD] pb-4">
                <h2 className="text-lg font-semibold text-[#293E30]">
                  Payment Method
                </h2>
                <p className="mt-1 text-sm text-[#777A70]">
                  Select your preferred payment option.
                </p>
              </div>

              <div className="space-y-3">
                {["COD", "Card", "UPI"].map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 text-sm"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={form.payment === method}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#293E30]"
                    />
                    <span className="font-medium">
                      {method === "COD"
                        ? "Cash on Delivery"
                        : method === "Card"
                          ? "Credit/Debit Card"
                          : "UPI"}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <section className="rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-5 shadow-sm sm:p-7 lg:sticky lg:top-6 ">
            <h2 className="border-b border-[#E8E6DD] pb-4 text-lg font-semibold text-[#293E30]">
              Order Summary
            </h2>

            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <span className="leading-5 text-[#62675E]">
                    {item.name} × {item.qty}
                  </span>
                  <span className="shrink-0 font-medium text-[#293E30]">
                    {formatCurrency(item.qty * item.price)}
                  </span>
                </li>
              ))}

              <li className="flex justify-between gap-4 border-t pt-4 text-base font-semibold text-[#293E30]">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </li>
            </ul>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full rounded-lg bg-[#293E30] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#3A5140]"
            >
              Place Order
            </button>
            {message && (
              <p
                role={message.type === "error" ? "alert" : "status"}
                aria-live={message.type === "error" ? "assertive" : "polite"}
                className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                  message.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#D7E3D3] bg-[#E8EEE5] text-[#36563B]"
                }`}
              >
                {message.text}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
