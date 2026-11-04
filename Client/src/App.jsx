import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoutes, { AuthRoute } from "./utils/ProtectedRoutes";
import Checkout from "./pages/Checkout";
import UserLayout from "./pages/UserLayout";
import ProductDetail from "./pages/ProductDetail";
import ErrorPage from "./components/ErrorPage";
import AppProvider from "./context/AppProvider";

const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoutes role="user">
        <UserLayout />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Navigate to="/products" replace /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "orders", element: <Orders /> },
      { path: "profile", element: <Profile /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <Admin />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      {
        path: "products",
        element: <AdminProducts />,
      },
      { path: "users", element: <AdminUsers /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },

  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

const AppWithProviders = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWithProviders;
