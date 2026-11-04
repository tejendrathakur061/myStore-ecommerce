import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useCart, { useCartActions } from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const { getUserCart } = useCart();
  const { removeFromCart, updateCartQuantity } = useCartActions();
  const [cartNotice, setCartNotice] = useState("");
  const cartItems = user ? getUserCart(user.id) : [];

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );
  const totalQuantity = cartItems.reduce((total, item) => total + item.qty, 0);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      setCartNotice("");
    } catch (error) {
      setCartNotice(error.message);
    }
  };
  const handleQty = async (productId, action) => {
    const updated = await updateCartQuantity(productId, action);

    setCartNotice(
      updated
        ? ""
        : "The available stock limit has been reached for this item.",
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] px-4 py-10 text-[#292D28] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7C897B]">
            Your Selection
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#293E30]">
            My Cart
          </h1>
          <p className="mt-2 text-sm text-[#777A70]">
            Review your selected products and order total.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#E7E5DC] bg-[#FCFCF8] shadow-sm">
          <div className="bg-[#293E30] px-6 py-7 sm:px-8">
            <p className="text-sm text-[#DDE5D9]">Shopping Summary</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
            </h2>
          </div>

          <div className="p-5 sm:p-8">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EDE7] text-2xl text-[#293E30]">
                  🛒
                </div>
                <h2 className="text-xl font-semibold text-[#293E30]">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-sm text-[#777A70]">
                  Add some products to see them here.
                </p>
                <Link
                  to="/products"
                  className="mt-5 inline-flex rounded-lg bg-[#293E30] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3A5140]"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <>
                <h3 className="mb-5 text-base font-semibold text-[#293E30]">
                  Cart Items
                </h3>
                {cartNotice && (
                  <p
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {cartNotice}
                  </p>
                )}

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#E7E5DC] bg-white/60 p-4 transition-colors hover:bg-white sm:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-28 w-28 rounded-xl bg-[#F0F1E9] object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-semibold text-[#293E30]">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-sm text-[#777A70]">
                            {formatCurrency(item.price)} per item
                          </p>
                          <p className="mt-2 text-lg font-semibold text-[#293E30]">
                            {formatCurrency(item.qty * item.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-[#E7E5DC] pt-4 sm:border-0 sm:pt-0">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#7C897B]">
                              Quantity
                            </p>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                aria-label={`Decrease quantity of ${item.name}`}
                                disabled={item.qty <= 1}
                                onClick={() => handleQty(item.id, "dec")}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8DED3] bg-[#FCFCF8] text-xl font-bold text-[#293E30] shadow-sm transition hover:bg-[#E8EDE7] hover:shadow-md cursor-pointer"
                              >
                                −
                              </button>

                              <span className="min-w-5 text-center text-sm font-semibold text-[#293E30]">
                                {item.qty}
                              </span>

                              <button
                                type="button"
                                aria-label={`Increase quantity of ${item.name}`}
                                disabled={
                                  Number.isFinite(item.stock) &&
                                  item.qty >= item.stock
                                }
                                onClick={() => handleQty(item.id, "inc")}
                                className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg bg-[#293E30] text-xl font-bold text-white shadow-sm transition hover:bg-[#3A5140] hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400"
                              >
                                +
                              </button>

                              <button
                                onClick={() => handleRemove(item.id)}
                                className="ml-4 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500 hover:text-white cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-[#F0F1E9] p-5 sm:p-6">
                  <h3 className="mb-5 text-base font-semibold text-[#293E30]">
                    Order Summary
                  </h3>

                  <div className="space-y-3 border-b border-[#DDE0D4] pb-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm text-[#293E30]"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="font-medium">
                          {formatCurrency(item.qty * item.price)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-b border-[#DDE0D4] pb-3 pt-3 text-sm text-[#62675E]">
                    <span className=" text-base font-semibold text-[#293E30]">
                      Total Items
                    </span>
                    <span className="text-xl font-bold text-[#293E30]">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-base font-semibold text-[#293E30]">
                      Grand Total
                    </span>
                    <span className="text-2xl font-bold text-[#293E30]">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/checkout")}
                    disabled={cartItems.length === 0}
                    className={`mt-6 w-full rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#293E30] focus:ring-offset-2 ${
                      cartItems.length > 0
                        ? "bg-[#293E30] text-white cursor-pointer hover:bg-[#3A5140]"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
