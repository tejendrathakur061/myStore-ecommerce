import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart, { useCartActions } from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const { addToCart, removeFromCart, updateCartQuantity } = useCartActions();
  const [message, setMessage] = useState("");
  const productId = product.id || product._id;
  const cartItem = cart.find((item) => String(item.id) === String(productId));

  const handleAddToCart = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(product);
      setMessage(`${product.name} added to your cart.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleQuantityChange = async (action) => {
    if (action === "dec" && cartItem.qty === 1) {
      try {
        await removeFromCart(productId);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
      return;
    }

    const updated = await updateCartQuantity(productId, action);
    setMessage(
      updated
        ? ""
        : "The available stock limit has been reached for this item.",
    );
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-[#E8E6DD] bg-[#FCFCF8] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4D8CC] hover:shadow-lg hover:shadow-[#293E30]/5 sm:p-4 ">
      <div>
        <Link to={`/products/${product.id}`} className="block">
          <div className="overflow-hidden rounded-lg bg-[#F0EFE8]">
            <img
              src={product.image}
              alt={product.name}
              className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-48"
            />
          </div>

          <div className="px-1 pt-4">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-[#85877C]">
              {product.category}
            </p>

            <h2 className="line-clamp-2 min-h-6 text-base font-semibold leading-6 text-[#292D28]">
              {product.name}
            </h2>

            <p className=" text-sm text-[#777A70]">{product.description}</p>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-lg font-semibold tracking-tight text-[#293E30]">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p
              className={`mt-2 text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </Link>
        {cartItem ? (
          <div className="mt-4 flex w-full items-center justify-center gap-5 rounded-lg border border-[#D8DED3] bg-white/60 px-4 py-2">
            <button
              type="button"
              aria-label={`Decrease quantity of ${product.name}`}
              onClick={() => handleQuantityChange("dec")}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8DED3] bg-[#FCFCF8] text-xl font-bold text-[#293E30] shadow-sm transition hover:bg-[#E8EDE7] hover:shadow-md cursor-pointer"
            >
              −
            </button>
            <span className="min-w-5 text-center text-sm font-semibold text-[#293E30]">
              {cartItem.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${product.name}`}
              disabled={
                Number.isFinite(cartItem.stock) &&
                cartItem.qty >= cartItem.stock
              }
              onClick={() => handleQuantityChange("inc")}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#293E30] text-xl font-bold text-white shadow-sm transition hover:bg-[#3A5140] hover:shadow-md cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#293E30] focus:ring-offset-2 ${
              product.stock > 0
                ? "bg-[#293E30] text-white  cursor-pointer hover:bg-[#3A5140]"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Unavailable"}
          </button>
        )}
        {message && (
          <p
            role={message.includes("stock limit") ? "alert" : "status"}
            aria-live={message.includes("stock limit") ? "assertive" : "polite"}
            className={`mt-2 text-center text-sm font-medium ${
              message.includes("stock limit")
                ? "text-[#A34D3D]"
                : "text-[#36563B]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
