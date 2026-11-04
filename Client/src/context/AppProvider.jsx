import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import { CartActionsContext, CartContext } from "./CartContext";
import ProductsContext from "./ProductsContext";
import api from "../utils/api";

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const productsRef = useRef(products);

  const [cart, setCart] = useState([]);
  const cartRef = useRef(cart);

  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await api("/auth/profile");
        setCurrentUser(data.user);
      } catch {
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api("/products");

        const normalizedProducts = data.map((product) => ({
          ...product,
          id: product._id,
        }));

        productsRef.current = normalizedProducts;
        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Products fetch failed:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (authLoading || !currentUser) {
      setCart([]);
      cartRef.current = [];
      return;
    }

    const fetchCart = async () => {
      try {
        const data = await api("/cart");

        const normalizedItems = data.items
          .filter((item) => item.productId)
          .map((item) => ({
            ...item.productId,
            id: item.productId._id,
            qty: item.qty,
          }));

        cartRef.current = normalizedItems;
        setCart(normalizedItems);
      } catch (error) {
        console.error("Cart fetch failed:", error.message);
      }
    };

    fetchCart();
  }, [authLoading, currentUser]);

  const addProduct = useCallback(async (product) => {
    const data = await api("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });

    const newProduct = {
      ...data.product,
      id: data.product._id,
    };

    const updatedProducts = [...productsRef.current, newProduct];

    productsRef.current = updatedProducts;
    setProducts(updatedProducts);

    return newProduct;
  }, []);

  const login = useCallback((user) => {
    setCurrentUser(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("/auth/logout", {
        method: "POST",
      });
    } finally {
      setCurrentUser(null);
    }
  }, []);

  const addToCart = useCallback(async (product) => {
    try {
      const data = await api("/cart/add", {
        method: "POST",
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const normalizedItems = data.cart.items
        .filter((item) => item.productId)
        .map((item) => ({
          ...item.productId,
          id: item.productId._id,
          qty: item.qty,
        }));

      cartRef.current = normalizedItems;
      setCart(normalizedItems);

      return true;
    } catch (error) {
      console.error("Add to cart failed:", error.message);
      throw error;
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const data = await api(`/cart/${productId}`, {
        method: "DELETE",
      });

      const normalizedItems = data.cart.items
        .filter((item) => item.productId)
        .map((item) => ({
          ...item.productId,
          id: item.productId._id,
          qty: item.qty,
        }));

      cartRef.current = normalizedItems;
      setCart(normalizedItems);
    } catch (error) {
      console.error("Remove from cart failed:", error.message);
      throw error;
    }
  }, []);

  const updateCartQuantity = useCallback(async (productId, action) => {
    try {
      const item = cartRef.current.find(
        (cartItem) => cartItem.id === productId,
      );

      if (!item) return false;

      const qty = action === "inc" ? item.qty + 1 : item.qty - 1;

      if (qty < 1) return false;

      const data = await api(`/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ qty }),
      });

      const normalizedItems = data.cart.items
        .filter((item) => item.productId)
        .map((item) => ({
          ...item.productId,
          id: item.productId._id,
          qty: item.qty,
        }));

      cartRef.current = normalizedItems;
      setCart(normalizedItems);

      return true;
    } catch (error) {
      console.error("Cart quantity update failed:", error.message);
      return false;
    }
  }, []);

  const clearUserCart = useCallback(() => {
    cartRef.current = [];
    setCart([]);
  }, []);

  const getUserCart = useCallback(() => cart, [cart]);

  const productsValue = useMemo(
    () => ({ products, addProduct }),
    [products, addProduct],
  );

  const authValue = useMemo(
    () => ({ currentUser, login, logout, authLoading }),
    [currentUser, login, logout, authLoading],
  );

  const cartValue = useMemo(() => ({ cart, getUserCart }), [cart, getUserCart]);

  const cartActionsValue = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearUserCart,
    }),
    [addToCart, removeFromCart, updateCartQuantity, clearUserCart],
  );

  return (
    <AuthContext.Provider value={authValue}>
      <ProductsContext.Provider value={productsValue}>
        <CartContext.Provider value={cartValue}>
          <CartActionsContext.Provider value={cartActionsValue}>
            {children}
          </CartActionsContext.Provider>
        </CartContext.Provider>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppProvider;
