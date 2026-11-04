import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AppProvider.");
  }

  return context;
};

export default useAuth;
