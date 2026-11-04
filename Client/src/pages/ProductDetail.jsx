import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCartActions } from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import formatCurrency from "../utils/formatCurrency";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { currentUser } = useAuth();
  const { addToCart } = useCartActions();
  const [message, setMessage] = useState("");
  const product = products.find((p) => p.id === id);

  const navigate = useNavigate();
  
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

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0]">
        <h2 className="text-xl font-semibold text-red-600">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] p-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[#E7E5DC] bg-[#FCFCF8] p-8 shadow-md">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-full rounded-xl object-cover shadow-sm md:h-96"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#293E30]">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-[#777A70]">
                {product.description}
              </p>

              <p className="mt-4 text-xl font-semibold text-[#293E30]">
                {formatCurrency(product.price)}
              </p>

              <p
                className={`mt-2 text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`mt-6 w-full rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#293E30] focus:ring-offset-2 ${
                product.stock > 0
                  ? "bg-[#293E30] text-white cursor-pointer hover:bg-[#3A5140]"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Add to Cart" : "Unavailable"}
            </button>
            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`mt-3 rounded-lg border px-4 py-3 text-sm font-medium ${
                  message.includes("stock limit")
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#D7E3D3] bg-[#E8EEE5] text-[#36563B]"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
