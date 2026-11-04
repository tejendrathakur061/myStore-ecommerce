import { useContext } from "react";
import { CartActionsContext, CartContext } from "../context/CartContext";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an AppProvider.");
  }

  return context;
};

export const useCartActions = () => {
  const context = useContext(CartActionsContext);

  if (!context) {
    throw new Error("useCartActions must be used within an AppProvider.");
  }

  return context;
};

export default useCart;
